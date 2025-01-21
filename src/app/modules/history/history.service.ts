import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { HistorySearchableFields, IHistoryFilter } from './history.constant'
import { IHistory } from './history.interface'
import { History } from './history.model'

const createHistory = async (
  history: IHistory,
  file?: Express.Multer.File
): Promise<IHistory> => {
  if (file) {
    history.image = `uploads/${file.filename}`
  }

  const result = await History.create(history)
  return result
}

const getAllHistory = async (
  filters: IHistoryFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IHistory[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: HistorySearchableFields.map(field => ({
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
    const questions = await History.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await History.countDocuments(whereConditions)
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
      'Unable to retrieve History'
    )
  }
}

const getSingleHistory = async (id: string): Promise<IHistory | null> => {
  try {
    const history = await History.findById(id)
    if (!history) {
      throw new ApiError(httpStatus.NOT_FOUND, 'History not found')
    }
    return history
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve history'
    )
  }
}

const updateHistory = async (
  id: string,
  updateData: Partial<IHistory>
): Promise<IHistory | null> => {
  try {
    const history = await History.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!history) {
      throw new ApiError(httpStatus.NOT_FOUND, 'history not found')
    }
    return history
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update History'
    )
  }
}

const deleteHistory = async (id: string): Promise<IHistory | null> => {
  try {
    const history = await History.findByIdAndDelete(id)
    if (!history) {
      throw new ApiError(httpStatus.NOT_FOUND, 'history not found')
    }
    return history
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete history'
    )
  }
}
export const HistoryService = {
  createHistory,
  getAllHistory,
  getSingleHistory,
  updateHistory,
  deleteHistory,
}
