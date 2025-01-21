import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { FeaturesController } from './features.controller'

const router = express.Router()

router.post('/', upload.single('image'), FeaturesController.createFeature)
router.get('/', FeaturesController.getAllFeatures)
router.get('/:id', FeaturesController.getSingleFeature)
router.patch('/:id', upload.single('image'), FeaturesController.updateFeature)
router.delete('/:id', FeaturesController.deleteFeature)

export const FeaturesRoute = router
