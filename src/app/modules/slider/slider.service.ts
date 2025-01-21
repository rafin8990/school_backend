import httpStatus from 'http-status'
import { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError'
import { paginationHelpers } from '../../../helper/paginationHelper'
import { IGenericResponse } from '../../../interfaces/common'
import { IPaginationOptions } from '../../../interfaces/pagination'
import { ISliderFilter, SliderSearchableFields } from './slider.constant'
import { ISlider } from './slider.interface'
import { Slider } from './slider.model'

const createSlider = async (
  slider: ISlider,
  file?: Express.Multer.File
): Promise<ISlider> => {
  if (!file) {
    throw new ApiError(httpStatus.NOT_FOUND, 'File Not Found')
  }
  if (file) {
    slider.image = `uploads/${file.filename}`
  }
  const result = await Slider.create(slider)
  return result
}

const getAllSlider = async (
  filters: ISliderFilter,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ISlider[]>> => {
  try {
    const { searchTerm, ...filtersData } = filters
    const { page, limit, skip, sortBy, sortOrder } =
      paginationHelpers.calculatePagination(paginationOptions)

    const andConditions = []
    if (searchTerm) {
      andConditions.push({
        $or: SliderSearchableFields.map(field => ({
          [field]: {
            $regex: searchTerm,
            $options: 'i',
          },
        })),
      })
    }

    if (Object.keys(filtersData).length) {
      andConditions.push({
        $and: Object.entries(filtersData).map(([field, value]) => ({
          [field]: value,
        })),
      })
    }

    const sortConditions: { [key: string]: SortOrder } = {}

    if (sortBy && sortOrder) {
      sortConditions[sortBy] = sortOrder
    }
    const whereConditions =
      andConditions.length > 0 ? { $and: andConditions } : {}
    const questions = await Slider.find(whereConditions)
      .sort(sortConditions)
      .skip(skip)
      .limit(limit)

    const total = await Slider.countDocuments(whereConditions)
    return {
      meta: {
        page,
        limit,
        total,
      },
      data: questions,
    }
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve Slider'
    )
  }
}

const getSingleSlider = async (id: string): Promise<ISlider | null> => {
  try {
    const slider = await Slider.findById(id)
    if (!slider) {
      throw new ApiError(httpStatus.NOT_FOUND, 'slider not found')
    }
    return slider
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to retrieve slider'
    )
  }
}

const updateSlider = async (
  id: string,
  updateData: Partial<ISlider>,
  file?: Express.Multer.File
): Promise<ISlider | null> => {
  try {
    if (file) {
      updateData.image = `uploads/${file.filename}`
    }
    const slider = await Slider.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    if (!slider) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Slider not found')
    }
    return slider
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to update slider'
    )
  }
}

const deleteSlider = async (id: string): Promise<ISlider | null> => {
  try {
    const answer = await Slider.findByIdAndDelete(id)
    if (!answer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'slider not found')
    }
    return answer
  } catch (error) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Unable to delete slider'
    )
  }
}

export const SliderService = {
  createSlider,
  getAllSlider,
  getSingleSlider,
  updateSlider,
  deleteSlider,
}
