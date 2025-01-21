import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { HistoryController } from './history.controller'
const router = express.Router()

router.post('/', upload.single('image'), HistoryController.createHistory)
router.get('/', HistoryController.getAllHistory)
router.get('/:id', HistoryController.getSingleHistory)
router.patch('/:id', HistoryController.updateHistory)
router.delete('/:id', HistoryController.deleteHistory)

export const historyRoute = router
