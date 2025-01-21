import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { SliderController } from './slider.controller'

const router = express.Router()

router.post('/', upload.single('image'), SliderController.createSlider)
router.get('/', SliderController.getAllSlider)
router.get('/:id', SliderController.getSingleSlider)
router.patch('/:id', upload.single('image'), SliderController.updateSlider)
router.delete('/:id', SliderController.deleteSlider)

export const SliderRoute = router
