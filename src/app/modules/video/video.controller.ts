import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { IVideoFilter, VideoFilterableFields } from './video.constant'
import { IVideo } from './video.interface'
import { VideoService } from './video.service'

const createVideo = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const video = req.body
  const data = await VideoService.createVideo(video, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Video created  Successfully',
    data: data,
  })
})

const getAllVideo = catchAsync(async (req: Request, res: Response) => {
  const filters: IVideoFilter = {
    ...pick(req.query, VideoFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await VideoService.getAllVideo(filters, paginationOptions)

  sendResponse<IVideo[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Video retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleVideo = catchAsync(async (req: Request, res: Response) => {
  const VideoId = req.params.id
  const result = await VideoService.getSingleVideo(VideoId)

  sendResponse<IVideo>(res, {
    statusCode: httpStatus.OK,
    message: 'Video retrieved successfully',
    success: true,
    data: result,
  })
})

const updateVideo = catchAsync(async (req: Request, res: Response) => {
  const VideoId = req.params.id
  const VideoData = req.body
  const result = await VideoService.updateVideo(VideoId, VideoData)

  sendResponse<IVideo>(res, {
    statusCode: httpStatus.OK,
    message: 'Video updated successfully',
    success: true,
    data: result,
  })
})

const deleteVideo = catchAsync(async (req: Request, res: Response) => {
  const VideoId = req.params.id
  const result = await VideoService.deleteVideo(VideoId)

  sendResponse<IVideo>(res, {
    statusCode: httpStatus.OK,
    message: 'Video deleted successfully',
    success: true,
    data: result,
  })
})

export const VideoController = {
  createVideo,
  getAllVideo,
  getSingleVideo,
  updateVideo,
  deleteVideo,
}
