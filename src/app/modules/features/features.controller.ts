import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { FeaturesFilterableFields, IFeaturesFilter } from './features.constant'
import { IFeatures } from './features.interface'
import { FeaturesService } from './features.service'

const createFeature = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const data = req.body
  const feature = await FeaturesService.createFeature(data, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Feature created successfully',
    data: feature,
  })
})

const getAllFeatures = catchAsync(async (req: Request, res: Response) => {
  const filters: IFeaturesFilter = {
    ...pick(req.query, FeaturesFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await FeaturesService.getAllFeatures(
    filters,
    paginationOptions
  )

  sendResponse<IFeatures[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Features retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFeature = catchAsync(async (req: Request, res: Response) => {
  const featureId = req.params.id
  const result = await FeaturesService.getSingleFeature(featureId)

  sendResponse<IFeatures>(res, {
    statusCode: httpStatus.OK,
    message: 'Feature retrieved successfully',
    success: true,
    data: result,
  })
})

const updateFeature = catchAsync(async (req: Request, res: Response) => {
  const featureId = req.params.id
  const file = req.file
  const featureData = req.body

  const result = await FeaturesService.updateFeature(
    featureId,
    featureData,
    file
  )

  sendResponse<IFeatures>(res, {
    statusCode: httpStatus.OK,
    message: 'Feature updated successfully',
    success: true,
    data: result,
  })
})

const deleteFeature = catchAsync(async (req: Request, res: Response) => {
  const featureId = req.params.id
  const result = await FeaturesService.deleteFeature(featureId)

  sendResponse<IFeatures>(res, {
    statusCode: httpStatus.OK,
    message: 'Feature deleted successfully',
    success: true,
    data: result,
  })
})

export const FeaturesController = {
  createFeature,
  getAllFeatures,
  getSingleFeature,
  updateFeature,
  deleteFeature,
}
