import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  ChairmanMessageFilterableFields,
  IChairmanMessageFilter,
} from './chairmanMessage.constant'
import { IChairmanMessage } from './chairmanMessage.interface'
import { ChairmanMessageService } from './chairmanMessage.service'

const createChairmanMessage = catchAsync(
  async (req: Request, res: Response) => {
    const file = req.file
    const ChairmanMessage = req.body
    const data = await ChairmanMessageService.createChairmanMessage(
      ChairmanMessage,
      file
    )
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Chairman Message created  Successfully',
      data: data,
    })
  }
)

const getAllChairmanMessage = catchAsync(
  async (req: Request, res: Response) => {
    const filters: IChairmanMessageFilter = {
      ...pick(req.query, ChairmanMessageFilterableFields),
      searchTerm: req.query.searchTerm as string,
    }
    const paginationOptions = pick(req.query, paginationFields)

    const result = await ChairmanMessageService.getAllChairmanMessage(
      filters,
      paginationOptions
    )

    sendResponse<IChairmanMessage[]>(res, {
      statusCode: httpStatus.OK,
      message: 'Chairman Message retrieved successfully',
      success: true,
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleChairmanMessage = catchAsync(
  async (req: Request, res: Response) => {
    const ChairmanMessageId = req.params.id
    const result = await ChairmanMessageService.getSingleChairmanMessage(
      ChairmanMessageId
    )

    sendResponse<IChairmanMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Chairman Message retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updateChairmanMessage = catchAsync(
  async (req: Request, res: Response) => {
    const ChairmanMessageId = req.params.id
    const ChairmanMessageData = req.body
    const result = await ChairmanMessageService.updateChairmanMessage(
      ChairmanMessageId,
      ChairmanMessageData
    )

    sendResponse<IChairmanMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Chairman Message updated successfully',
      success: true,
      data: result,
    })
  }
)

const deleteChairmanMessage = catchAsync(
  async (req: Request, res: Response) => {
    const ChairmanMessageId = req.params.id
    const result = await ChairmanMessageService.deleteChairmanMessage(
      ChairmanMessageId
    )

    sendResponse<IChairmanMessage>(res, {
      statusCode: httpStatus.OK,
      message: 'Chairman Message deleted successfully',
      success: true,
      data: result,
    })
  }
)

export const ChairmanMessageController = {
  createChairmanMessage,
  getAllChairmanMessage,
  getSingleChairmanMessage,
  updateChairmanMessage,
  deleteChairmanMessage,
}
