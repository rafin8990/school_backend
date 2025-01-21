import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { InstituteMottoController } from './InstituteMotto.controller'

const router = express.Router()

router.post(
  '/',
  upload.single('image'),
  InstituteMottoController.createInstituteMotto
)
router.get('/', InstituteMottoController.getAllInstituteMotto)
router.get('/:id', InstituteMottoController.getSingleInstituteMotto)
router.patch(
  '/:id',
  upload.single('image'),
  InstituteMottoController.updateInstituteMotto
)
router.delete('/:id', InstituteMottoController.deleteInstituteMotto)

export const InstituteMottoRoute = router
