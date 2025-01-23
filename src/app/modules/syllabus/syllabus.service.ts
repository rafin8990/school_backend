import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { ISyllabusFilter, SyllabusSearchableFields } from './syllabus.constant'
import { ISyllabus } from './syllabus.interface'
import { Syllabus } from './syllabus.model'

const createSyllabus = async (
  syllabus: ISyllabus,
  file?: Express.Multer.File
): Promise<ISyllabus> => {
  if (file) {
    syllabus.pdfUrl = `pdf/${file.filename}`
  }

  const result = await Syllabus.create(syllabus)
  return result
}

const getAllSyllabus = async (
  filters: ISyllabusFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISyllabus[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: SyllabusSearchableFields.map(field => ({
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
  const syllabus = await Syllabus.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Syllabus.countDocuments(whereConditions)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: syllabus,
  }
}

const getSingleSyllabus = async (id: string): Promise<ISyllabus | null> => {
  const syllabus = await Syllabus.findById(id)
  if (!syllabus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Syllabus not found')
  }
  return syllabus
}

const updateSyllabus = async (
  id: string,
  updateData: Partial<ISyllabus>,
  file?: Express.Multer.File
): Promise<ISyllabus | null> => {
  if (file) {
    updateData.pdfUrl = `uploads/${file.filename}`
  }
  const syllabus = await Syllabus.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!syllabus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Syllabus not found')
  }
  return syllabus
}

const deleteSyllabus = async (id: string): Promise<ISyllabus | null> => {
  const syllabus = await Syllabus.findByIdAndDelete(id)
  if (!syllabus) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Syllabus not found')
  }
  return syllabus
}

export const SyllabusService = {
  createSyllabus,
  getAllSyllabus,
  getSingleSyllabus,
  updateSyllabus,
  deleteSyllabus,
}
