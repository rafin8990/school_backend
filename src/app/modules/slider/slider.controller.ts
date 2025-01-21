import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { ISliderFilter, SliderFilterableFields } from './slider.constant'
import { ISlider } from './slider.interface'
import { SliderService } from './slider.service'

const createSlider = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const status = req.body
  const slider = await SliderService.createSlider(status, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slide created  Successfully',
    data: slider,
  })
})

const getAllSlider = catchAsync(async (req: Request, res: Response) => {
  const filters: ISliderFilter = {
    ...pick(req.query, SliderFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await SliderService.getAllSlider(filters, paginationOptions)

  sendResponse<ISlider[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Slider retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSlider = catchAsync(async (req: Request, res: Response) => {
  const sliderId = req.params.id
  const result = await SliderService.getSingleSlider(sliderId)

  sendResponse<ISlider>(res, {
    statusCode: httpStatus.OK,
    message: 'Slider retrieved successfully',
    success: true,
    data: result,
  })
})

const updateSlider = catchAsync(async (req: Request, res: Response) => {
  const sliderId = req.params.id
  const file = req.file
  const sliderData = req.body
  console.log({ sliderData, sliderId })

  const result = await SliderService.updateSlider(sliderId, sliderData, file)

  sendResponse<ISlider>(res, {
    statusCode: httpStatus.OK,
    message: 'Slider updated successfully',
    success: true,
    data: result,
  })
})

const deleteSlider = catchAsync(async (req: Request, res: Response) => {
  const sliderId = req.params.id
  const result = await SliderService.deleteSlider(sliderId)

  sendResponse<ISlider>(res, {
    statusCode: httpStatus.OK,
    message: 'Slider deleted successfully',
    success: true,
    data: result,
  })
})

export const SliderController = {
  createSlider,
  getAllSlider,
  getSingleSlider,
  updateSlider,
  deleteSlider,
}
