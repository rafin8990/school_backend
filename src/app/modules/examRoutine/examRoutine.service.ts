import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  ExamRoutineSearchableFields,
  IExamRoutineFilter,
} from './examRoutine.constant'
import { IExamRoutine } from './examRoutine.interface'
import { ExamRoutine } from './examRoutine.model'

const createExamRoutine = async (
  examRoutine: IExamRoutine
): Promise<IExamRoutine> => {
  const result = await ExamRoutine.create(examRoutine)
  return result
}

const getAllExamRoutines = async (
  filters: IExamRoutineFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IExamRoutine[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: ExamRoutineSearchableFields.map(field => ({
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

  const sortConditions: { [key: string]: 1 | -1 } = {}

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const result = await ExamRoutine.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await ExamRoutine.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleExamRoutine = async (
  id: string
): Promise<IExamRoutine | null> => {
  const examRoutine = await ExamRoutine.findById(id)
  if (!examRoutine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam routine not found')
  }
  return examRoutine
}

const updateExamRoutine = async (
  id: string,
  updateData: Partial<IExamRoutine>
): Promise<IExamRoutine | null> => {
  const examRoutine = await ExamRoutine.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!examRoutine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam routine not found')
  }
  return examRoutine
}

const deleteExamRoutine = async (id: string): Promise<IExamRoutine | null> => {
  const examRoutine = await ExamRoutine.findByIdAndDelete(id)
  if (!examRoutine) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Exam routine not found')
  }
  return examRoutine
}

export const ExamRoutineService = {
  createExamRoutine,
  getAllExamRoutines,
  getSingleExamRoutine,
  updateExamRoutine,
  deleteExamRoutine,
}
