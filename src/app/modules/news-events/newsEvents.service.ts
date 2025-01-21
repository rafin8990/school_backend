import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  INewsEventsFilter,
  NewsEventsSearchableFields,
} from './newsEvents.constant'
import { INewsEvents } from './newsEvents.interface'
import { NewsEvents } from './newsEvents.model'

const createNewsEvent = async (
  newsEvent: INewsEvents,
  file?: Express.Multer.File
): Promise<INewsEvents> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    newsEvent.image = `uploads/${file.filename}`
  }
  const result = await NewsEvents.create(newsEvent)
  return result
}

const getAllNewsEvents = async (
  filters: INewsEventsFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<INewsEvents[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: NewsEventsSearchableFields.map(field => ({
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
  const data = await NewsEvents.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await NewsEvents.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data,
  }
}

const getSingleNewsEvent = async (id: string): Promise<INewsEvents | null> => {
  const newsEvent = await NewsEvents.findById(id)
  if (!newsEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News/Event not found')
  }
  return newsEvent
}

const updateNewsEvent = async (
  id: string,
  updateData: Partial<INewsEvents>,
  file?: Express.Multer.File
): Promise<INewsEvents | null> => {
  if (file) {
    updateData.image = `uploads/${file.filename}`
  }
  const newsEvent = await NewsEvents.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!newsEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News/Event not found')
  }
  return newsEvent
}

const deleteNewsEvent = async (id: string): Promise<INewsEvents | null> => {
  const newsEvent = await NewsEvents.findByIdAndDelete(id)
  if (!newsEvent) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News/Event not found')
  }
  return newsEvent
}

export const NewsEventsService = {
  createNewsEvent,
  getAllNewsEvents,
  getSingleNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
}
