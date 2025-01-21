import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { INoticeFilter, NoticeSearchableFields } from './notice.constant'
import { INotice } from './notice.interface'
import { Notice } from './notice.model'

const createNotice = async (
  notice: INotice,
  file?: Express.Multer.File
): Promise<INotice> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    notice.pdfUrl = `pdf/${file.filename}`
  }
  const result = await Notice.create(notice)
  return result
}

const getAllNotice = async (
  filters: INoticeFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INotice[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: NoticeSearchableFields.map(field => ({
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
    const questions = await Notice.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Notice.countDocuments(whereConditions)
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
      'Unable to retrieve School Notice'
    )
  }
}

const getSingleNotice = async (id: string): Promise<INotice | null> => {
  try {
    const notice = await Notice.findById(id)
    if (!notice) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found')
    }
    return notice
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Notice'
    )
  }
}

const updateNotice = async (
  id: string,
  updateData: Partial<INotice>,
  file?: Express.Multer.File
): Promise<INotice | null> => {
  try {
    if (file) {
      updateData.pdfUrl = `pdf/${file.filename}`
    }
    const notice = await Notice.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!notice) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found')
    }
    return notice
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update Notice'
    )
  }
}

const deleteNotice = async (id: string): Promise<INotice | null> => {
  try {
    const notice = await Notice.findByIdAndDelete(id)
    if (!notice) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Notice not found')
    }
    return notice
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete Notice'
    )
  }
}

export const NoticeService = {
  createNotice,
  getAllNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
}
