import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  AdmissionCircularFilterableFields,
  IAdmissionCircularFilter,
} from './admissionCircular.constant'
import { IAdmissionCircular } from './admissionCircular.interface'
import { AdmissionCircularService } from './admissionCircular.service'

const createAdmissionCircular = catchAsync(
  async (req: Request, res: Response) => {
    const file = req.file
    const circular = req.body
    const admissionCircular =
      await AdmissionCircularService.createAdmissionCircular(circular, file)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission Circular created successfully',
      data: admissionCircular,
    })
  }
)

const getAllAdmissionCircular = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IAdmissionCircularFilter = {
      ...pick(req.query, AdmissionCircularFilterableFields),
      searchTerm: req.query.searchTerm as string,
    }
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AdmissionCircularService.getAllAdmissionCircular(
      filters,
      paginationOptions
    )

    sendResponse<IAdmissionCircular[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Circulars retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleAdmissionCircular = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AdmissionCircularService.getSingleAdmissionCircular(id)

    sendResponse<IAdmissionCircular>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Circular retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updateAdmissionCircular = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const updateData = req.body

    const result = await AdmissionCircularService.updateAdmissionCircular(
      id,
      updateData
    )

    sendResponse<IAdmissionCircular>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Circular updated successfully',
      success: true,
      data: result,
    })
  }
)

const deleteAdmissionCircular = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await AdmissionCircularService.deleteAdmissionCircular(id)

    sendResponse<IAdmissionCircular>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Circular deleted successfully',
      success: true,
      data: result,
    })
  }
)

export const AdmissionCircularController = {
  createAdmissionCircular,
  getAllAdmissionCircular,
  getSingleAdmissionCircular,
  updateAdmissionCircular,
  deleteAdmissionCircular,
}
