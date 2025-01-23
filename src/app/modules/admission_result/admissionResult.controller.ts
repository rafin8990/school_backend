import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  AdmissionResultFilterableFields,
  IAdmissionResultFilter,
} from './admissionResult.constant'
import { IAdmissionResult } from './admissionResult.interface'
import { AdmissionResultService } from './admissionResult.service'

const createAdmissionResult = catchAsync(
  async (req: Request, res: Response) => {
    const file = req.file

    const admissionResultData = req.body
    const admissionResult = await AdmissionResultService.createAdmissionResult(
      admissionResultData,
      file
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admission Result created successfully',
      data: admissionResult,
    })
  }
)

const getAllAdmissionResults = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IAdmissionResultFilter = {
      ...pick(req.query, AdmissionResultFilterableFields),
      searchTerm: req.query.searchTerm as string,
    }
    const paginationOptions = pick(req.query, paginationFields)

    const result = await AdmissionResultService.getAllAdmissionResults(
      filters,
      paginationOptions
    )

    sendResponse<IAdmissionResult[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Results retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleAdmissionResult = catchAsync(
  async (req: Request, res: Response) => {
    const admissionResultId = req.params.id
    const result = await AdmissionResultService.getSingleAdmissionResult(
      admissionResultId
    )

    sendResponse<IAdmissionResult>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Result retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updateAdmissionResult = catchAsync(
  async (req: Request, res: Response) => {
    const admissionResultId = req.params.id
    const file = req.file
    const admissionResultData = req.body

    const result = await AdmissionResultService.updateAdmissionResult(
      admissionResultId,
      admissionResultData,
      file
    )

    sendResponse<IAdmissionResult>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Result updated successfully',
      success: true,
      data: result,
    })
  }
)

const deleteAdmissionResult = catchAsync(
  async (req: Request, res: Response) => {
    const admissionResultId = req.params.id
    const result = await AdmissionResultService.deleteAdmissionResult(
      admissionResultId
    )

    sendResponse<IAdmissionResult>(res, {
      statusCode: httpStatus.OK,
      message: 'Admission Result deleted successfully',
      success: true,
      data: result,
    })
  }
)

export const AdmissionResultController = {
  createAdmissionResult,
  getAllAdmissionResults,
  getSingleAdmissionResult,
  updateAdmissionResult,
  deleteAdmissionResult,
}
