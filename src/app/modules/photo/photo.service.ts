import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IPhotoFilter, PhotoSearchableFields } from './photo.constant'
import { IPhoto } from './photo.interface'
import { Photo } from './photo.model'

const createPhoto = async (
  photo: IPhoto,
  file?: Express.Multer.File
): Promise<IPhoto> => {
  if (file) {
    photo.image = `uploads/${file.filename}`
  }

  const result = await Photo.create(photo)
  return result
}

const getAllPhoto = async (
  filters: IPhotoFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IPhoto[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: PhotoSearchableFields.map(field => ({
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
    const questions = await Photo.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Photo.countDocuments(whereConditions)
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
      'Unable to retrieve Photo'
    )
  }
}

const getSinglePhoto = async (id: string): Promise<IPhoto | null> => {
  try {
    const photo = await Photo.findById(id)
    if (!photo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Photo not found')
    }
    return photo
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve photo'
    )
  }
}

const updatePhoto = async (
  id: string,
  updateData: Partial<IPhoto>
): Promise<IPhoto | null> => {
  try {
    const photo = await Photo.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!photo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'photo not found')
    }
    return photo
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update photo'
    )
  }
}

const deletePhoto = async (id: string): Promise<IPhoto | null> => {
  try {
    const photo = await Photo.findByIdAndDelete(id)
    if (!photo) {
      throw new ApiError(httpStatus.NOT_FOUND, 'photo not found')
    }
    return photo
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete photo'
    )
  }
}
export const PhotoService = {
  createPhoto,
  getAllPhoto,
  getSinglePhoto,
  updatePhoto,
  deletePhoto,
}
