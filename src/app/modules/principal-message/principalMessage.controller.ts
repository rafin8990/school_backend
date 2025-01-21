import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  IPrincipalMessageFilter,
  PrincipalMessageFilterableFields,
} from './principalMessage.constant'
import { IPrincipalMessage } from './principalMessage.interface'
import { PrincipalMessageService } from './principalMessage.service'

const createPrincipalMessage = catchAsync(
  async (req: Request, res: Response) => {
    const file = req.file

    const principalMessageData = req.body
    const principalMessage =
      await PrincipalMessageService.createPrincipalMessage(
        principalMessageData,
        file
      )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Principal message created successfully',
      data: principalMessage,
    })
  }
)

const getAllPrincipalMessages = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IPrincipalMessageFilter = {
      ...pick(req.query, PrincipalMessageFilterableFields),
      searchTerm: req.query.searchTerm as string,
    }
    const paginationOptions = pick(req.query, paginationFields)

    const result = await PrincipalMessageService.getAllPrincipalMessages(
      filters,
      paginationOptions
    )

    sendResponse<IPrincipalMessage[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Principal messages retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSinglePrincipalMessage = catchAsync(
  async (req: Request, res: Response) => {
    const principalMessageId = req.params.id
    const result = await PrincipalMessageService.getSinglePrincipalMessage(
      principalMessageId
    )

    sendResponse<IPrincipalMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Principal message retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updatePrincipalMessage = catchAsync(
  async (req: Request, res: Response) => {
    const principalMessageId = req.params.id
    const file = req.file
    const principalMessageData = req.body

    const result = await PrincipalMessageService.updatePrincipalMessage(
      principalMessageId,
      principalMessageData,
      file
    )

    sendResponse<IPrincipalMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Principal message updated successfully',
      success: true,
      data: result,
    })
  }
)

const deletePrincipalMessage = catchAsync(
  async (req: Request, res: Response) => {
    const principalMessageId = req.params.id
    const result = await PrincipalMessageService.deletePrincipalMessage(
      principalMessageId
    )

    sendResponse<IPrincipalMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Principal message deleted successfully',
      success: true,
      data: result,
    })
  }
)

export const PrincipalMessageController = {
  createPrincipalMessage,
  getAllPrincipalMessages,
  getSinglePrincipalMessage,
  updatePrincipalMessage,
  deletePrincipalMessage,
}
