import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  AtAGlanceSearchableFields,
  IAtAGlanceFilter,
} from './at_a_glance.constant'
import { IAtAGlance } from './at_a_glance.interface'
import { AtAGlance } from './at_a_glance.model'

const createAtAGlance = async (
  at_a_glance: IAtAGlance,
  file?: Express.Multer.File
): Promise<IAtAGlance> => {
  if (file) {
    at_a_glance.image = `uploads/${file.filename}`
  }
  const result = await AtAGlance.create(at_a_glance)
  return result
}

const getAllAtAGlance = async (
  filters: IAtAGlanceFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAtAGlance[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: AtAGlanceSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {}
    const questions = await AtAGlance.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await AtAGlance.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: questions,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve At A Glance'
    )
  }
}

const getSingleAtAGlance = async (id: string): Promise<IAtAGlance | null> => {
  try {
    const at_a_glance = await AtAGlance.findById(id)
    if (!at_a_glance) {
      throw new ApiError(httpStatus.NOT_FOUND, 'at_a_glance not found')
    }
    return at_a_glance
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve at_a_glance'
    )
  }
}

const updateAtAGlance = async (
  id: string,
  updateData: Partial<IAtAGlance>,
  file?: Express.Multer.File
): Promise<IAtAGlance | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const slider = await AtAGlance.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!slider) {
      throw new ApiError(httpStatus.NOT_FOUND, 'at_a_glance not found')
    }
    return slider
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update at_a_glance'
    )
  }
}

const deleteAtAGlance = async (id: string): Promise<IAtAGlance | null> => {
  try {
    const answer = await AtAGlance.findByIdAndDelete(id)
    if (!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'at_a_glance not found')
    }
    return answer
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete at_a_glance'
    )
  }
}

export const AtAGlanceService = {
  createAtAGlance,
  getAllAtAGlance,
  getSingleAtAGlance,
  updateAtAGlance,
  deleteAtAGlance,
}
