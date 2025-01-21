import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  ChairmanMessageSearchableFields,
  IChairmanMessageFilter,
} from './chairmanMessage.constant'
import { IChairmanMessage } from './chairmanMessage.interface'
import { ChairmanMessage } from './chairmanMessage.model'

const createChairmanMessage = async (
  chairmanMessage: IChairmanMessage,
  file?: Express.Multer.File
): Promise<IChairmanMessage> => {
  if (file) {
    chairmanMessage.image = `uploads/${file.filename}`
  }

  const result = await ChairmanMessage.create(chairmanMessage)
  return result
}

const getAllChairmanMessage = async (
  filters: IChairmanMessageFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IChairmanMessage[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: ChairmanMessageSearchableFields.map(field => ({
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
    const questions = await ChairmanMessage.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await ChairmanMessage.countDocuments(whereConditions)
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
      'Unable to retrieve chairman message'
    )
  }
}

const getSingleChairmanMessage = async (
  id: string
): Promise<IChairmanMessage | null> => {
  try {
    const chairmanMessage = await ChairmanMessage.findById(id)
    if (!chairmanMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chairman message not found')
    }
    return chairmanMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Chairman Message'
    )
  }
}

const updateChairmanMessage = async (
  id: string,
  updateData: Partial<IChairmanMessage>
): Promise<IChairmanMessage | null> => {
  try {
    const chairmanMessage = await ChairmanMessage.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    )

    if (!chairmanMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chairman message not found')
    }
    return chairmanMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update chairmanMessage'
    )
  }
}

const deleteChairmanMessage = async (
  id: string
): Promise<IChairmanMessage | null> => {
  try {
    const chairmanMessage = await ChairmanMessage.findByIdAndDelete(id)
    if (!chairmanMessage) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Chairman message not found')
    }
    return chairmanMessage
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete Chairman message'
    )
  }
}
export const ChairmanMessageService = {
  createChairmanMessage,
  getAllChairmanMessage,
  getSingleChairmanMessage,
  updateChairmanMessage,
  deleteChairmanMessage,
}
