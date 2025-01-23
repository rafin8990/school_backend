import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { ISyllabusFilter, SyllabusFilterableFields } from './syllabus.constant'
import { ISyllabus } from './syllabus.interface'
import { SyllabusService } from './syllabus.service'

const createSyllabus = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const syllabusData = req.body
  const syllabus = await SyllabusService.createSyllabus(syllabusData, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Syllabus created Successfully',
    data: syllabus,
  })
})

const getAllSyllabus = catchAsync(async (req: Request, res: Response) => {
  const filters: ISyllabusFilter = {
    ...pick(req.query, SyllabusFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await SyllabusService.getAllSyllabus(
    filters,
    paginationOptions
  )

  sendResponse<ISyllabus[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Syllabus retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleSyllabus = catchAsync(async (req: Request, res: Response) => {
  const syllabusId = req.params.id
  const result = await SyllabusService.getSingleSyllabus(syllabusId)

  sendResponse<ISyllabus>(res, {
    statusCode: httpStatus.OK,
    message: 'Syllabus retrieved successfully',
    success: true,
    data: result,
  })
})

const updateSyllabus = catchAsync(async (req: Request, res: Response) => {
  const syllabusId = req.params.id
  const file = req.file
  const syllabusData = req.body

  const result = await SyllabusService.updateSyllabus(
    syllabusId,
    syllabusData,
    file
  )

  sendResponse<ISyllabus>(res, {
    statusCode: httpStatus.OK,
    message: 'Syllabus updated successfully',
    success: true,
    data: result,
  })
})

const deleteSyllabus = catchAsync(async (req: Request, res: Response) => {
  const syllabusId = req.params.id
  const result = await SyllabusService.deleteSyllabus(syllabusId)

  sendResponse<ISyllabus>(res, {
    statusCode: httpStatus.OK,
    message: 'Syllabus deleted successfully',
    success: true,
    data: result,
  })
})

export const SyllabusController = {
  createSyllabus,
  getAllSyllabus,
  getSingleSyllabus,
  updateSyllabus,
  deleteSyllabus,
}
