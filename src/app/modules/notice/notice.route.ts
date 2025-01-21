import express from 'express'
import { uploadPDF } from '../../middlewares/uploadPdf'
import { NoticeController } from './notice.controller'
const router = express.Router()

router.post('/', uploadPDF.single('pdf'), NoticeController.createNotice)
router.get('/', NoticeController.getAllNotice)
router.get('/:id', NoticeController.getSingleNotice)
router.patch('/:id', uploadPDF.single('pdf'), NoticeController.updateNotice)
router.delete('/:id', NoticeController.deleteNotice)

export const NoticeRoute = router
