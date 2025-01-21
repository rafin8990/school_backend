import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IInstituteMottoFilter,
  InstituteMottoSearchableFields,
} from './InstituteMotto.constant'

import { IInstituteMotto } from './InstituteMotto.interface'
import { InstituteMotto } from './InstituteMotto.model'

const createInstituteMotto = async (
  instituteMotto: IInstituteMotto,
  file?: Express.Multer.File
): Promise<IInstituteMotto> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    instituteMotto.image = `uploads/${file.filename}`
  }
  const result = await InstituteMotto.create(instituteMotto)
  return result
}

const getAllInstituteMotto = async (
  filters: IInstituteMottoFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IInstituteMotto[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: InstituteMottoSearchableFields.map(field => ({
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
    const questions = await InstituteMotto.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await InstituteMotto.countDocuments(whereConditions)
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
      'Unable to retrieve Institute Motto'
    )
  }
}

const getSingleInstituteMotto = async (
  id: string
): Promise<IInstituteMotto | null> => {
  try {
    const instituteMotto = await InstituteMotto.findById(id)
    if (!instituteMotto) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Institute Motto not found')
    }
    return instituteMotto
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Institute Motto'
    )
  }
}

const updateInstituteMotto = async (
  id: string,
  updateData: Partial<IInstituteMotto>,
  file?: Express.Multer.File
): Promise<IInstituteMotto | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const instituteMotto = await InstituteMotto.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!instituteMotto) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Institute Motto not found')
    }
    return instituteMotto
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update Institute Motto'
    )
  }
}

const deleteInstituteMotto = async (
  id: string
): Promise<IInstituteMotto | null> => {
  try {
    const answer = await InstituteMotto.findByIdAndDelete(id)
    if (!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Institute Motto not found')
    }
    return answer
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete Institute Motto'
    )
  }
}

export const InstituteMottoService = {
  createInstituteMotto,
  getAllInstituteMotto,
  getSingleInstituteMotto,
  updateInstituteMotto,
  deleteInstituteMotto,
}
