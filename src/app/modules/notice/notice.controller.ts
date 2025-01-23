import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { INoticeFilter, NoticeFilterableFields } from './notice.constant'
import { INotice } from './notice.interface'
import { NoticeService } from './notice.service'

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const notice = req.body

  const data = await NoticeService.createNotice(notice, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notice created  Successfully',
    data: data,
  })
})

const getAllNotice = catchAsync(async (req: Request, res: Response) => {
  const filters: INoticeFilter = {
    ...pick(req.query, NoticeFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await NoticeService.getAllNotice(filters, paginationOptions)

  sendResponse<INotice[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Notice retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleNotice = catchAsync(async (req: Request, res: Response) => {
  const NoticeId = req.params.id
  const result = await NoticeService.getSingleNotice(NoticeId)

  sendResponse<INotice>(res, {
    statusCode: httpStatus.OK,
    message: 'Notice retrieved successfully',
    success: true,
    data: result,
  })
})

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const NoticeId = req.params.id
  const file = req.file
  const NoticeData = req.body

  const result = await NoticeService.updateNotice(NoticeId, NoticeData, file)

  sendResponse<INotice>(res, {
    statusCode: httpStatus.OK,
    message: 'Notice updated successfully',
    success: true,
    data: result,
  })
})

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const NoticeId = req.params.id
  const result = await NoticeService.deleteNotice(NoticeId)

  sendResponse<INotice>(res, {
    statusCode: httpStatus.OK,
    message: 'Notice deleted successfully',
    success: true,
    data: result,
  })
})

export const NoticeController = {
  createNotice,
  getAllNotice,
  getSingleNotice,
  updateNotice,
  deleteNotice,
}
