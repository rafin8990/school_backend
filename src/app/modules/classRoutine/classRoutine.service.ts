import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  ClassRoutineSearchableFields,
  IClassRoutineFilter,
} from './classRoutine.constant'
import { IClassRoutine } from './classRoutine.interface'
import { ClassRoutine } from './classRoutine.model'

const createClassRoutine = async (
  classRoutine: IClassRoutine
): Promise<IClassRoutine> => {
  const result = await ClassRoutine.create(classRoutine)
  return result
}

const getAllClassRoutines = async (
  filters: IClassRoutineFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IClassRoutine[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: ClassRoutineSearchableFields.map(field => ({
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
  const routines = await ClassRoutine.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await ClassRoutine.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: routines,
  }
}

const getSingleClassRoutine = async (
  id: string
): Promise<IClassRoutine | null> => {
  const classRoutine = await ClassRoutine.findById(id)
  if (!classRoutine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class routine not found')
  }
  return classRoutine
}

const updateClassRoutine = async (
  id: string,
  updateData: Partial<IClassRoutine>
): Promise<IClassRoutine | null> => {
  const classRoutine = await ClassRoutine.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })
  if (!classRoutine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class routine not found')
  }
  return classRoutine
}

const deleteClassRoutine = async (
  id: string
): Promise<IClassRoutine | null> => {
  const routine = await ClassRoutine.findByIdAndDelete(id)
  if (!routine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Class routine not found')
  }
  return routine
}

export const ClassRoutineService = {
  createClassRoutine,
  getAllClassRoutines,
  getSingleClassRoutine,
  updateClassRoutine,
  deleteClassRoutine,
}
