import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { AchievementsController } from './achievements.controller'

const router = express.Router()

router.post(
  '/',
  upload.single('image'),
  AchievementsController.createAchievements
)
router.get('/', AchievementsController.getAllAchievements)
router.get('/:id', AchievementsController.getSingleAchievement)
router.patch(
  '/:id',
  upload.single('image'),
  AchievementsController.updateAchievements
)
router.delete('/:id', AchievementsController.deleteAchievements)

export const AchievementsRoute = router
