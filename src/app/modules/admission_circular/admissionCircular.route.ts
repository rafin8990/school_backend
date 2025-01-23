import express from 'express'
import { uploadPDF } from '../../middlewares/uploadPdf'
import { AdmissionCircularController } from './admissionCircular.controller'

const router = express.Router()

router.post(
  '/',
  uploadPDF.single('pdf'),
  AdmissionCircularController.createAdmissionCircular
)
router.get('/', AdmissionCircularController.getAllAdmissionCircular)
router.get('/:id', AdmissionCircularController.getSingleAdmissionCircular)
router.patch('/:id', AdmissionCircularController.updateAdmissionCircular)
router.delete('/:id', AdmissionCircularController.deleteAdmissionCircular)

export const AdmissionCircularRoute = router
