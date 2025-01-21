import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { VideoController } from './video.controller'

const router = express.Router()

router.post('/', upload.single('thumbnail'), VideoController.createVideo)
router.get('/', VideoController.getAllVideo)
router.get('/:id', VideoController.getSingleVideo)
router.patch('/:id', VideoController.updateVideo)
router.delete('/:id', VideoController.deleteVideo)

export const VideoRoute = router
