import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { InfoController } from './info.controller'
const router = express.Router()

router.post('/', upload.single('logo'), InfoController.createInfo)
router.get('/', InfoController.getAllInfo)
router.get('/:id', InfoController.getSingleInfo)
router.patch('/:id', upload.single('logo'), InfoController.updateInfo)
router.delete('/:id', InfoController.deleteInfo)

export const InfoRoute = router
