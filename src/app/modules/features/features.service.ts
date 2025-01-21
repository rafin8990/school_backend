import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { FeaturesSearchableFields, IFeaturesFilter } from './features.constant'
import { IFeatures } from './features.interface'
import { Features } from './features.model'

const createFeature = async (
  feature: IFeatures,
  file?: Express.Multer.File
): Promise<IFeatures> => {
  if (file) {
    feature.image = `uploads/${file.filename}`
  }
  const result = await Features.create(feature)
  return result
}

const getAllFeatures = async (
  filters: IFeaturesFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFeatures[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: FeaturesSearchableFields.map(field => ({
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
    const features = await Features.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Features.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: features,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve features'
    )
  }
}

const getSingleFeature = async (id: string): Promise<IFeatures | null> => {
  try {
    const feature = await Features.findById(id)
    if (!feature) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found')
    }
    return feature
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve feature'
    )
  }
}

const updateFeature = async (
  id: string,
  updateData: Partial<IFeatures>,
  file?: Express.Multer.File
): Promise<IFeatures | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const feature = await Features.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!feature) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found')
    }
    return feature
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update feature'
    )
  }
}

const deleteFeature = async (id: string): Promise<IFeatures | null> => {
  try {
    const feature = await Features.findByIdAndDelete(id)
    if (!feature) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Feature not found')
    }
    return feature
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete feature'
    )
  }
}

export const FeaturesService = {
  createFeature,
  getAllFeatures,
  getSingleFeature,
  updateFeature,
  deleteFeature,
}
