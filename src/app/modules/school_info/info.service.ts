import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IInfoFilter, InfoSearchableFields } from './info.constant'
import { IInfo } from './info.interface'
import { Info } from './info.model'

const createInfo = async (
  info: IInfo,
  file?: Express.Multer.File
): Promise<IInfo> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    info.logo = `uploads/${file.filename}`
  }
  const result = await Info.create(info)
  return result
}

const getAllInfo = async (
  filters: IInfoFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IInfo[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: InfoSearchableFields.map(field => ({
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
    const questions = await Info.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Info.countDocuments(whereConditions)
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
      'Unable to retrieve School Info'
    )
  }
}

const getSingleInfo = async (id: string): Promise<IInfo | null> => {
  try {
    const info = await Info.findById(id)
    if (!info) {
      throw new ApiError(httpStatus.NOT_FOUND, 'info not found')
    }
    return info
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve info'
    )
  }
}

const updateInfo = async (
  id: string,
  updateData: Partial<IInfo>,
  file?: Express.Multer.File
): Promise<IInfo | null> => {
  try {
    if (file) {
      updateData.logo = `uploads/${file.filename}`
    }
    const info = await Info.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!info) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Info not found')
    }
    return info
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update info'
    )
  }
}

const deleteInfo = async (id: string): Promise<IInfo | null> => {
  try {
    const info = await Info.findByIdAndDelete(id)
    if (!info) {
      throw new ApiError(httpStatus.NOT_FOUND, 'info not found')
    }
    return info
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete info'
    )
  }
}

export const InfoService = {
  createInfo,
  getAllInfo,
  getSingleInfo,
  updateInfo,
  deleteInfo,
}
