import express from 'express'
import { uploadPDF } from '../../middlewares/uploadPdf'
import { SyllabusController } from './syllabus.controller'

const router = express.Router()

router.post('/', uploadPDF.single('pdf'), SyllabusController.createSyllabus)
router.get('/', SyllabusController.getAllSyllabus)
router.get('/:id', SyllabusController.getSingleSyllabus)
router.patch('/:id', uploadPDF.single('pdf'), SyllabusController.updateSyllabus)
router.delete('/:id', SyllabusController.deleteSyllabus)

export const SyllabusRoute = router
