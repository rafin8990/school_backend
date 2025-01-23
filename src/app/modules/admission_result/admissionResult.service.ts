import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import {
  AdmissionResultSearchableFields,
  IAdmissionResultFilter,
} from './admissionResult.constant'
import { IAdmissionResult } from './admissionResult.interface'
import { AdmissionResult } from './admissionResult.model'

const createAdmissionResult = async (
  admissionResult: IAdmissionResult,
  file?: Express.Multer.File
): Promise<IAdmissionResult> => {
  if (file) {
    admissionResult.pdfUrl = `pdf/${file.filename}`
  }

  return await AdmissionResult.create(admissionResult)
}

const getAllAdmissionResults = async (
  filters: IAdmissionResultFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmissionResult[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: AdmissionResultSearchableFields.map(field => ({
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

  const results = await AdmissionResult.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await AdmissionResult.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: results,
  }
}

const getSingleAdmissionResult = async (
  id: string
): Promise<IAdmissionResult | null> => {
  const result = await AdmissionResult.findById(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Result not found')
  }
  return result
}

const updateAdmissionResult = async (
  id: string,
  updateData: Partial<IAdmissionResult>,
  file?: Express.Multer.File
): Promise<IAdmissionResult | null> => {
  if (file) {
    updateData.pdfUrl = `uploads/${file.filename}`
  }
  const result = await AdmissionResult.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  })

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Result not found')
  }
  return result
}

const deleteAdmissionResult = async (
  id: string
): Promise<IAdmissionResult | null> => {
  const result = await AdmissionResult.findByIdAndDelete(id)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Result not found')
  }
  return result
}

export const AdmissionResultService = {
  createAdmissionResult,
  getAllAdmissionResults,
  getSingleAdmissionResult,
  updateAdmissionResult,
  deleteAdmissionResult,
}
