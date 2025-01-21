import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'

import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import { ITeacherFilter, TeacherFilterableFields } from './teachers.constant'
import { ITeacher } from './teachers.interface'
import { TeacherService } from './teachers.service'

const createTeacher = catchAsync(async (req: Request, res: Response) => {
  const file = req.file

  const teacherData = req.body
  const teacher = await TeacherService.createTeacher(teacherData, file)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Teacher created successfully',
    data: teacher,
  })
})

const getAllTeachers = catchAsync(async (req: Request, res: Response) => {
  const filters: ITeacherFilter = {
    ...pick(req.query, TeacherFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await TeacherService.getAllTeachers(filters, paginationOptions)

  sendResponse<ITeacher[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Teachers retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.params.id
  const result = await TeacherService.getSingleTeacher(teacherId)

  sendResponse<ITeacher>(res, {
    statusCode: httpStatus.OK,
    message: 'Teacher retrieved successfully',
    success: true,
    data: result,
  })
})

const updateTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.params.id
  const file = req.file
  const teacherData = req.body

  const result = await TeacherService.updateTeacher(
    teacherId,
    teacherData,
    file
  )

  sendResponse<ITeacher>(res, {
    statusCode: httpStatus.OK,
    message: 'Teacher updated successfully',
    success: true,
    data: result,
  })
})

const deleteTeacher = catchAsync(async (req: Request, res: Response) => {
  const teacherId = req.params.id
  const result = await TeacherService.deleteTeacher(teacherId)

  sendResponse<ITeacher>(res, {
    statusCode: httpStatus.OK,
    message: 'Teacher deleted successfully',
    success: true,
    data: result,
  })
})

export const TeacherController = {
  createTeacher,
  getAllTeachers,
  getSingleTeacher,
  updateTeacher,
  deleteTeacher,
}
