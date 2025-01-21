import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  IPrincipalMessageFilter,
  PrincipalMessageSearchableFields,
} from './principalMessage.constant'
import { IPrincipalMessage } from './principalMessage.interface'
import { PrincipalMessage } from './principalMessage.model'

const createPrincipalMessage = async (
  principalMessage: IPrincipalMessage,
  file?: Express.Multer.File
): Promise<IPrincipalMessage> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    principalMessage.image = `uploads/${file.filename}`
  }
  const result = await PrincipalMessage.create(principalMessage)
  return result
}

const getAllPrincipalMessages = async (
  filters: IPrincipalMessageFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPrincipalMessage[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: PrincipalMessageSearchableFields.map(field => ({
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
    const principalMessages = await PrincipalMessage.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await PrincipalMessage.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: principalMessages,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve principal messages'
    )
  }
}

const getSinglePrincipalMessage = async (
  id: string
): Promise<IPrincipalMessage | null> => {
  try {
    const principalMessage = await PrincipalMessage.findById(id)
    if (!principalMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Principal message not found')
    }
    return principalMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve principal message'
    )
  }
}

const updatePrincipalMessage = async (
  id: string,
  updateData: Partial<IPrincipalMessage>,
  file?: Express.Multer.File
): Promise<IPrincipalMessage | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const principalMessage = await PrincipalMessage.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!principalMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Principal message not found')
    }
    return principalMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update principal message'
    )
  }
}

const deletePrincipalMessage = async (
  id: string
): Promise<IPrincipalMessage | null> => {
  try {
    const principalMessage = await PrincipalMessage.findByIdAndDelete(id)
    if (!principalMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Principal message not found')
    }
    return principalMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete principal message'
    )
  }
}

export const PrincipalMessageService = {
  createPrincipalMessage,
  getAllPrincipalMessages,
  getSinglePrincipalMessage,
  updatePrincipalMessage,
  deletePrincipalMessage,
}
