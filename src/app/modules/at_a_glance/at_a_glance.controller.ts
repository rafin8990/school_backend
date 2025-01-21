import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  AtAGlanceFilterableFields,
  IAtAGlanceFilter,
} from './at_a_glance.constant'
import { IAtAGlance } from './at_a_glance.interface'
import { AtAGlanceService } from './at_a_glance.service'

const createAtAGlance = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const at_a_glance = req.body
  console.log({ at_a_glance, file })
  const slider = await AtAGlanceService.createAtAGlance(at_a_glance, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'at_a_glance created  Successfully',
    data: slider,
  })
})

const getAllAtAGlance = catchAsync(async (req: Request, res: Response) => {
  const filters: IAtAGlanceFilter = {
    ...pick(req.query, AtAGlanceFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AtAGlanceService.getAllAtAGlance(
    filters,
    paginationOptions
  )

  sendResponse<IAtAGlance[]>(res, {
    statusCode: httpStatus.OK,
    message: 'at_a_glance retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAtAGlance = catchAsync(async (req: Request, res: Response) => {
  const at_a_glanceId = req.params.id
  const result = await AtAGlanceService.getSingleAtAGlance(at_a_glanceId)

  sendResponse<IAtAGlance>(res, {
    statusCode: httpStatus.OK,
    message: 'at_a_glance retrieved successfully',
    success: true,
    data: result,
  })
})

const updateAtAGlance = catchAsync(async (req: Request, res: Response) => {
  const at_a_glanceId = req.params.id
  const file = req.file
  const at_a_glance_Data = req.body

  const result = await AtAGlanceService.updateAtAGlance(
    at_a_glanceId,
    at_a_glance_Data,
    file
  )

  sendResponse<IAtAGlance>(res, {
    statusCode: httpStatus.OK,
    message: 'at_a_glance updated successfully',
    success: true,
    data: result,
  })
})

const deleteAtAGlance = catchAsync(async (req: Request, res: Response) => {
  const at_a_glance_Id = req.params.id
  const result = await AtAGlanceService.deleteAtAGlance(at_a_glance_Id)

  sendResponse<IAtAGlance>(res, {
    statusCode: httpStatus.OK,
    message: 'at_a_glance deleted successfully',
    success: true,
    data: result,
  })
})

export const AtAGlanceController = {
  createAtAGlance,
  getAllAtAGlance,
  getSingleAtAGlance,
  updateAtAGlance,
  deleteAtAGlance,
}
