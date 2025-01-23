import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { IAdmissionCircularFilter } from './admissionCircular.constant'
import { IAdmissionCircular } from './admissionCircular.interface'
import { AdmissionCircular } from './admissionCircular.model'

const createAdmissionCircular = async (
  data: IAdmissionCircular,
  file?: Express.Multer.File
): Promise<IAdmissionCircular> => {
  if (file) {
    data.pdfUrl = `pdf/${file.filename}`
  }

  return await AdmissionCircular.create(data)
}

const getAllAdmissionCircular = async (
  filters: IAdmissionCircularFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmissionCircular[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: [{ title: { $regex: searchTerm, $options: 'i' } }],
    })
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {}
  const data = await AdmissionCircular.find(whereConditions)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit)

  const total = await AdmissionCircular.countDocuments(whereConditions)

  return { meta: { page, limit, total }, data }
}

const getSingleAdmissionCircular = async (
  id: string
): Promise<IAdmissionCircular | null> => {
  const admissionCircular = await AdmissionCircular.findById(id)
  if (!admissionCircular) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Circular not found')
  }
  return admissionCircular
}

const updateAdmissionCircular = async (
  id: string,
  updateData: Partial<IAdmissionCircular>
): Promise<IAdmissionCircular | null> => {
  const admissionCircular = await AdmissionCircular.findByIdAndUpdate(
    id,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )

  if (!admissionCircular) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Circular not found')
  }

  return admissionCircular
}

const deleteAdmissionCircular = async (
  id: string
): Promise<IAdmissionCircular | null> => {
  const admissionCircular = await AdmissionCircular.findByIdAndDelete(id)
  if (!admissionCircular) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admission Circular not found')
  }
  return admissionCircular
}

export const AdmissionCircularService = {
  createAdmissionCircular,
  getAllAdmissionCircular,
  getSingleAdmissionCircular,
  updateAdmissionCircular,
  deleteAdmissionCircular,
}
