import express from 'express'
import { AchievementsController } from './achievements.controller'

const router = express.Router()

router.post(
  '/',

  AchievementsController.createAchievements
)
router.get('/', AchievementsController.getAllAchievements)
router.get('/:id', AchievementsController.getSingleAchievement)
router.patch(
  '/:id',

  AchievementsController.updateAchievements
)
router.delete('/:id', AchievementsController.deleteAchievements)

export const AchievementsRoute = router
