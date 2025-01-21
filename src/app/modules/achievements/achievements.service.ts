import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  AchievementsSearchableFields,
  IAchievementsFilter,
} from './achievements.constant'
import { IAchievements } from './achievements.interface'
import { Achievements } from './achievements.model'

const createAchievements = async (
  achievements: IAchievements,
  file?: Express.Multer.File
): Promise<IAchievements> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    achievements.image = `uploads/${file.filename}`
  }
  const result = await Achievements.create(achievements)
  return result
}

const getAllAchievements = async (
  filters: IAchievementsFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAchievements[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: AchievementsSearchableFields.map(field => ({
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
    const achievements = await Achievements.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Achievements.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: achievements,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Achievements'
    )
  }
}

const getSingleAchievement = async (
  id: string
): Promise<IAchievements | null> => {
  try {
    const achievement = await Achievements.findById(id)
    if (!achievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found')
    }
    return achievement
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Achievement'
    )
  }
}

const updateAchievements = async (
  id: string,
  updateData: Partial<IAchievements>,
  file?: Express.Multer.File
): Promise<IAchievements | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const achievement = await Achievements.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!achievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found')
    }
    return achievement
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update Achievement'
    )
  }
}

const deleteAchievements = async (
  id: string
): Promise<IAchievements | null> => {
  try {
    const achievement = await Achievements.findByIdAndDelete(id)
    if (!achievement) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Achievement not found')
    }
    return achievement
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete Achievement'
    )
  }
}

export const AchievementsService = {
  createAchievements,
  getAllAchievements,
  getSingleAchievement,
  updateAchievements,
  deleteAchievements,
}
