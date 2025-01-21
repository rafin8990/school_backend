import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IVideoFilter, VideoSearchableFields } from './video.constant'
import { IVideo } from './video.interface'
import { Video } from './video.model'

const createVideo = async (
  video: IVideo,
  file?: Express.Multer.File
): Promise<IVideo> => {
  if (file) {
    video.thumbnail = `uploads/${file.filename}`
  }

  const result = await Video.create(video)
  return result
}

const getAllVideo = async (
  filters: IVideoFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IVideo[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: VideoSearchableFields.map(field => ({
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
    const questions = await Video.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Video.countDocuments(whereConditions)
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
      'Unable to retrieve Video'
    )
  }
}

const getSingleVideo = async (id: string): Promise<IVideo | null> => {
  try {
    const video = await Video.findById(id)
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'video not found')
    }
    return video
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve video'
    )
  }
}

const updateVideo = async (
  id: string,
  updateData: Partial<IVideo>
): Promise<IVideo | null> => {
  try {
    const video = await Video.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'video not found')
    }
    return video
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update video'
    )
  }
}

const deleteVideo = async (id: string): Promise<IVideo | null> => {
  try {
    const video = await Video.findByIdAndDelete(id)
    if (!video) {
      throw new ApiError(httpStatus.NOT_FOUND, 'video not found')
    }
    return video
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete video'
    )
  }
}
export const VideoService = {
  createVideo,
  getAllVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
