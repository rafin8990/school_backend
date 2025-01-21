import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { AtAGlanceController } from './at_a_glance.controller'

const router = express.Router()

router.post('/', upload.single('image'), AtAGlanceController.createAtAGlance)
router.get('/', AtAGlanceController.getAllAtAGlance)
router.get('/:id', AtAGlanceController.getSingleAtAGlance)
router.patch(
  '/:id',
  upload.single('image'),
  AtAGlanceController.updateAtAGlance
)
router.delete('/:id', AtAGlanceController.deleteAtAGlance)

export const AtAGlanceRoute = router
