import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { ChairmanMessageController } from './chairmanMessage.controller'

const router = express.Router()

router.post(
  '/',
  upload.single('image'),
  ChairmanMessageController.createChairmanMessage
)
router.get('/', ChairmanMessageController.getAllChairmanMessage)
router.get('/:id', ChairmanMessageController.getSingleChairmanMessage)
router.patch('/:id', ChairmanMessageController.updateChairmanMessage)
router.delete('/:id', ChairmanMessageController.deleteChairmanMessage)

export const ChairmanMessageRoute = router
