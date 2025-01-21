import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { ITeacherFilter, TeacherSearchableFields } from './teachers.constant'
import { ITeacher } from './teachers.interface'
import { Teacher } from './teachers.model'

const createTeacher = async (
  teacher: ITeacher,
  file?: Express.Multer.File
): Promise<ITeacher> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    teacher.image = `uploads/${file.filename}`
  }
  const result = await Teacher.create(teacher)
  return result
}

const getAllTeachers = async (
  filters: ITeacherFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ITeacher[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: TeacherSearchableFields.map(field => ({
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
  const teachers = await Teacher.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Teacher.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: teachers,
  }
}

const getSingleTeacher = async (id: string): Promise<ITeacher | null> => {
  const teacher = await Teacher.findById(id)
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found')
  }
  return teacher
}

const updateTeacher = async (
  id: string,
  updateData: Partial<ITeacher>,
  file?: Express.Multer.File
): Promise<ITeacher | null> => {
  if (file) {
    updateData.image = `uploads/${file.filename}`
  }
  const teacher = await Teacher.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found')
  }
  return teacher
}

const deleteTeacher = async (id: string): Promise<ITeacher | null> => {
  const teacher = await Teacher.findByIdAndDelete(id)
  if (!teacher) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Teacher not found')
  }
  return teacher
}

export const TeacherService = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
}
