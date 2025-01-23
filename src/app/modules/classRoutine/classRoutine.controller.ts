import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  ClassRoutineFilterableFields,
  IClassRoutineFilter,
} from './classRoutine.constant'
import { IClassRoutine } from './classRoutine.interface'
import { ClassRoutineService } from './classRoutine.service'

const createClassRoutine = catchAsync(async (req: Request, res: Response) => {
  const classRoutineData = req.body
  const classRoutine = await ClassRoutineService.createClassRoutine(
    classRoutineData
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Class routine created successfully',
    data: classRoutine,
  })
})

const getAllClassRoutines = catchAsync(async (req: Request, res: Response) => {
  const filters: IClassRoutineFilter = {
    ...pick(req.query, ClassRoutineFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ClassRoutineService.getAllClassRoutines(
    filters,
    paginationOptions
  )

  sendResponse<IClassRoutine[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Class routines retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleClassRoutine = catchAsync(
  async (req: Request, res: Response) => {
    const classRoutineId = req.params.id
    const result = await ClassRoutineService.getSingleClassRoutine(
      classRoutineId
    )

    sendResponse<IClassRoutine>(res, {
      statusCode: httpStatus.OK,
      message: 'Class routine retrieved successfully',
      success: true,
      data: result,
    })
  }
)

const updateClassRoutine = catchAsync(async (req: Request, res: Response) => {
  const classRoutineId = req.params.id
  const classRoutineData = req.body

  const result = await ClassRoutineService.updateClassRoutine(
    classRoutineId,
    classRoutineData
  )

  sendResponse<IClassRoutine>(res, {
    statusCode: httpStatus.OK,
    message: 'Class routine updated successfully',
    success: true,
    data: result,
  })
})

const deleteClassRoutine = catchAsync(async (req: Request, res: Response) => {
  const classRoutineId = req.params.id
  const result = await ClassRoutineService.deleteClassRoutine(classRoutineId)

  sendResponse<IClassRoutine>(res, {
    statusCode: httpStatus.OK,
    message: 'Class routine deleted successfully',
    success: true,
    data: result,
  })
})

export const ClassRoutineController = {
  createClassRoutine,
  getAllClassRoutines,
  getSingleClassRoutine,
  updateClassRoutine,
  deleteClassRoutine,
}
