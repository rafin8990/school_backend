import express from 'express'
import { uploadPDF } from '../../middlewares/uploadPdf'
import { AdmissionResultController } from './admissionResult.controller'

const router = express.Router()

router.post(
  '/',
  uploadPDF.single('pdf'),
  AdmissionResultController.createAdmissionResult
)
router.get('/', AdmissionResultController.getAllAdmissionResults)
router.get('/:id', AdmissionResultController.getSingleAdmissionResult)
router.patch(
  '/:id',
  uploadPDF.single('pdf'),
  AdmissionResultController.updateAdmissionResult
)
router.delete('/:id', AdmissionResultController.deleteAdmissionResult)

export const AdmissionResultRoute = router
