import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  IInstituteMottoFilter,
  InstituteMottoFilterableFields,
} from './InstituteMotto.constant'

import { IInstituteMotto } from './InstituteMotto.interface'
import { InstituteMottoService } from './InstituteMotto.service'

const createInstituteMotto = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const status = req.body
  const instituteMotto = await InstituteMottoService.createInstituteMotto(
    status,
    file
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Institute Motto created successfully',
    data: instituteMotto,
  })
})

const getAllInstituteMotto = catchAsync(async (req: Request, res: Response) => {
  const filters: IInstituteMottoFilter = {
    ...pick(req.query, InstituteMottoFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await InstituteMottoService.getAllInstituteMotto(
    filters,
    paginationOptions
  )

  sendResponse<IInstituteMotto[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Institute Motto retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleInstituteMotto = catchAsync(
  async (req: Request, res: Response) => {
    const instituteMottoId = req.params.id
    const result = await InstituteMottoService.getSingleInstituteMotto(
      instituteMottoId
    )

    sendResponse<IInstituteMotto>(res, {
      statusCode: httpStatus.OK,
      message: 'Institute Motto retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updateInstituteMotto = catchAsync(async (req: Request, res: Response) => {
  const instituteMottoId = req.params.id
  const file = req.file
  const instituteMottoData = req.body

  const result = await InstituteMottoService.updateInstituteMotto(
    instituteMottoId,
    instituteMottoData,
    file
  )

  sendResponse<IInstituteMotto>(res, {
    statusCode: httpStatus.OK,
    message: 'Institute Motto updated successfully',
    success: true,
    data: result,
  })
})

const deleteInstituteMotto = catchAsync(async (req: Request, res: Response) => {
  const instituteMottoId = req.params.id
  const result = await InstituteMottoService.deleteInstituteMotto(
    instituteMottoId
  )

  sendResponse<IInstituteMotto>(res, {
    statusCode: httpStatus.OK,
    message: 'Institute Motto deleted successfully',
    success: true,
    data: result,
  })
})

export const InstituteMottoController = {
  createInstituteMotto,
  getAllInstituteMotto,
  getSingleInstituteMotto,
  updateInstituteMotto,
  deleteInstituteMotto,
}
