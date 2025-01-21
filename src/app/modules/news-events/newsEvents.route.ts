import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { NewsEventsController } from './newsEvents.controller'

const router = express.Router()

router.post('/', upload.single('image'), NewsEventsController.createNewsEvent)
router.get('/', NewsEventsController.getAllNewsEvents)
router.get('/:id', NewsEventsController.getSingleNewsEvent)
router.patch(
  '/:id',
  upload.single('image'),
  NewsEventsController.updateNewsEvent
)
router.delete('/:id', NewsEventsController.deleteNewsEvent)

export const NewsEventsRoute = router
