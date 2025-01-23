import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  ExamRoutineFilterableFields,
  IExamRoutineFilter,
} from './examRoutine.constant'
import { IExamRoutine } from './examRoutine.interface'
import { ExamRoutineService } from './examRoutine.service'

const createExamRoutine = catchAsync(async (req: Request, res: Response) => {
  const examRoutineData = req.body
  const examRoutine = await ExamRoutineService.createExamRoutine(
    examRoutineData
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exam routine created successfully',
    data: examRoutine,
  })
})

const getAllExamRoutines = catchAsync(async (req: Request, res: Response) => {
  const filters: IExamRoutineFilter = {
    ...pick(req.query, ExamRoutineFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await ExamRoutineService.getAllExamRoutines(
    filters,
    paginationOptions
  )

  sendResponse<IExamRoutine[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Exam routines retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleExamRoutine = catchAsync(async (req: Request, res: Response) => {
  const examRoutineId = req.params.id
  const result = await ExamRoutineService.getSingleExamRoutine(examRoutineId)

  sendResponse<IExamRoutine>(res, {
    statusCode: httpStatus.OK,
    message: 'Exam routine retrieved successfully',
    success: true,
    data: result,
  })
})

const updateExamRoutine = catchAsync(async (req: Request, res: Response) => {
  const examRoutineId = req.params.id
  const examRoutineData = req.body

  const result = await ExamRoutineService.updateExamRoutine(
    examRoutineId,
    examRoutineData
  )

  sendResponse<IExamRoutine>(res, {
    statusCode: httpStatus.OK,
    message: 'Exam routine updated successfully',
    success: true,
    data: result,
  })
})

const deleteExamRoutine = catchAsync(async (req: Request, res: Response) => {
  const examRoutineId = req.params.id
  const result = await ExamRoutineService.deleteExamRoutine(examRoutineId)

  sendResponse<IExamRoutine>(res, {
    statusCode: httpStatus.OK,
    message: 'Exam routine deleted successfully',
    success: true,
    data: result,
  })
})

export const ExamRoutineController = {
  createExamRoutine,
  getAllExamRoutines,
  getSingleExamRoutine,
  updateExamRoutine,
  deleteExamRoutine,
}
