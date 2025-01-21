import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { HistoryFilterableFields, IHistoryFilter } from './history.constant'
import { IHistory } from './history.interface'
import { HistoryService } from './history.service'

const createHistory = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const history = req.body
  const data = await HistoryService.createHistory(history, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'History created  Successfully',
    data: data,
  })
})

const getAllHistory = catchAsync(async (req: Request, res: Response) => {
  const filters: IHistoryFilter = {
    ...pick(req.query, HistoryFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await HistoryService.getAllHistory(filters, paginationOptions)

  sendResponse<IHistory[]>(res, {
    statusCode: httpStatus.OK,
    message: 'History retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleHistory = catchAsync(async (req: Request, res: Response) => {
  const HistoryId = req.params.id
  const result = await HistoryService.getSingleHistory(HistoryId)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    message: 'History retrieved successfully',
    success: true,
    data: result,
  })
})

const updateHistory = catchAsync(async (req: Request, res: Response) => {
  const HistoryId = req.params.id
  const HistoryData = req.body
  const result = await HistoryService.updateHistory(HistoryId, HistoryData)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    message: 'History updated successfully',
    success: true,
    data: result,
  })
})

const deleteHistory = catchAsync(async (req: Request, res: Response) => {
  const HistoryId = req.params.id
  const result = await HistoryService.deleteHistory(HistoryId)

  sendResponse<IHistory>(res, {
    statusCode: httpStatus.OK,
    message: 'History deleted successfully',
    success: true,
    data: result,
  })
})

export const HistoryController = {
  createHistory,
  getAllHistory,
  getSingleHistory,
  updateHistory,
  deleteHistory,
}
