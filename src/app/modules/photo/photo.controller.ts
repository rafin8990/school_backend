import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { IPhotoFilter, PhotoFilterableFields } from './photo.constant'
import { IPhoto } from './photo.interface'
import { PhotoService } from './photo.service'

const createPhoto = catchAsync(async (req: Request, res: Response) => {
  const file = req.file
  const photo = req.body
  const data = await PhotoService.createPhoto(photo, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Photo created  Successfully',
    data: data,
  })
})

const getAllPhoto = catchAsync(async (req: Request, res: Response) => {
  const filters: IPhotoFilter = {
    ...pick(req.query, PhotoFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await PhotoService.getAllPhoto(filters, paginationOptions)

  sendResponse<IPhoto[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Photo retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSinglePhoto = catchAsync(async (req: Request, res: Response) => {
  const PhotoId = req.params.id
  const result = await PhotoService.getSinglePhoto(PhotoId)

  sendResponse<IPhoto>(res, {
    statusCode: httpStatus.OK,
    message: 'Photo retrieved successfully',
    success: true,
    data: result,
  })
})

const updatePhoto = catchAsync(async (req: Request, res: Response) => {
  const PhotoId = req.params.id
  const PhotoData = req.body
  const result = await PhotoService.updatePhoto(PhotoId, PhotoData)

  sendResponse<IPhoto>(res, {
    statusCode: httpStatus.OK,
    message: 'Photo updated successfully',
    success: true,
    data: result,
  })
})

const deletePhoto = catchAsync(async (req: Request, res: Response) => {
  const PhotoId = req.params.id
  const result = await PhotoService.deletePhoto(PhotoId)

  sendResponse<IPhoto>(res, {
    statusCode: httpStatus.OK,
    message: 'Photo deleted successfully',
    success: true,
    data: result,
  })
})

export const PhotoController = {
  createPhoto,
  getAllPhoto,
  getSinglePhoto,
  updatePhoto,
  deletePhoto,
}
