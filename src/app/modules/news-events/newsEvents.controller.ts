import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'

import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  INewsEventsFilter,
  NewsEventsFilterableFields,
} from './newsEvents.constant'
import { INewsEvents } from './newsEvents.interface'
import { NewsEventsService } from './newsEvents.service'

const createNewsEvent = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const newsEventData = req.body
  const newsEvent = await NewsEventsService.createNewsEvent(newsEventData, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'News/Event created successfully',
    data: newsEvent,
  })
})

const getAllNewsEvents = catchAsync(async (req: Request, res: Response) => {
  const filters: INewsEventsFilter = {
    ...pick(req.query, NewsEventsFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await NewsEventsService.getAllNewsEvents(
    filters,
    paginationOptions
  )

  sendResponse<INewsEvents[]>(res, {
    statusCode: httpStatus.OK,
    message: 'News/Events retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleNewsEvent = catchAsync(async (req: Request, res: Response) => {
  const newsEventId = req.params.id
  const result = await NewsEventsService.getSingleNewsEvent(newsEventId)

  sendResponse<INewsEvents>(res, {
    statusCode: httpStatus.OK,
    message: 'News/Event retrieved successfully',
    success: true,
    data: result,
  })
})

const updateNewsEvent = catchAsync(async (req: Request, res: Response) => {
  const newsEventId = req.params.id
  const file = req.file
  const newsEventData = req.body

  const result = await NewsEventsService.updateNewsEvent(
    newsEventId,
    newsEventData,
    file
  )

  sendResponse<INewsEvents>(res, {
    statusCode: httpStatus.OK,
    message: 'News/Event updated successfully',
    success: true,
    data: result,
  })
})

const deleteNewsEvent = catchAsync(async (req: Request, res: Response) => {
  const newsEventId = req.params.id
  const result = await NewsEventsService.deleteNewsEvent(newsEventId)

  sendResponse<INewsEvents>(res, {
    statusCode: httpStatus.OK,
    message: 'News/Event deleted successfully',
    success: true,
    data: result,
  })
})

export const NewsEventsController = {
  createNewsEvent,
  getAllNewsEvents,
  getSingleNewsEvent,
  updateNewsEvent,
  deleteNewsEvent,
}
