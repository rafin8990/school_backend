import { Request, Response } from 'express'
import httpStatus from 'http-status'
import catchAsync from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import sendResponse from '../../../shared/sendResponse'
import { paginationFields } from '../../constants/pagination'
import {
  AchievementsFilterableFields,
  IAchievementsFilter,
} from './achievements.constant'
import { IAchievements } from './achievements.interface'
import { AchievementsService } from './achievements.service'

const createAchievements = catchAsync(async (req: Request, res: Response) => {
  const achievementsData = req.body
  const achievement = await AchievementsService.createAchievements(
    achievementsData
  )
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Achievement created successfully',
    data: achievement,
  })
})

const getAllAchievements = catchAsync(async (req: Request, res: Response) => {
  const filters: IAchievementsFilter = {
    ...pick(req.query, AchievementsFilterableFields),
    searchTerm: req.query.searchTerm as string,
  }
  const paginationOptions = pick(req.query, paginationFields)

  const result = await AchievementsService.getAllAchievements(
    filters,
    paginationOptions
  )

  sendResponse<IAchievements[]>(res, {
    statusCode: httpStatus.OK,
    message: 'Achievements retrieved successfully',
    success: true,
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAchievement = catchAsync(async (req: Request, res: Response) => {
  const achievementId = req.params.id
  const result = await AchievementsService.getSingleAchievement(achievementId)

  sendResponse<IAchievements>(res, {
    statusCode: httpStatus.OK,
    message: 'Achievement retrieved successfully',
    success: true,
    data: result,
  })
})

const updateAchievements = catchAsync(async (req: Request, res: Response) => {
  const achievementId = req.params.id

  const achievementsData = req.body
  console.log({ achievementsData, achievementId })

  const result = await AchievementsService.updateAchievements(
    achievementId,
    achievementsData
  )

  sendResponse<IAchievements>(res, {
    statusCode: httpStatus.OK,
    message: 'Achievement updated successfully',
    success: true,
    data: result,
  })
})

const deleteAchievements = catchAsync(async (req: Request, res: Response) => {
  const achievementId = req.params.id
  const result = await AchievementsService.deleteAchievements(achievementId)

  sendResponse<IAchievements>(res, {
    statusCode: httpStatus.OK,
    message: 'Achievement deleted successfully',
    success: true,
    data: result,
  })
})

export const AchievementsController = {
  createAchievements,
  getAllAchievements,
  getSingleAchievement,
  updateAchievements,
  deleteAchievements,
}
