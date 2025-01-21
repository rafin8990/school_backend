import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { PhotoController } from './photo.controller'

const router = express.Router()

router.post('/', upload.single('image'), PhotoController.createPhoto)
router.get('/', PhotoController.getAllPhoto)
router.get('/:id', PhotoController.getSinglePhoto)
router.patch('/:id', PhotoController.updatePhoto)
router.delete('/:id', PhotoController.deletePhoto)

export const photoRoute = router
