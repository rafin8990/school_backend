import express from 'express'
import { ExamRoutineController } from './examRoutine.controller'

const router = express.Router()

router.post('/', ExamRoutineController.createExamRoutine)
router.get('/', ExamRoutineController.getAllExamRoutines)
router.get('/:id', ExamRoutineController.getSingleExamRoutine)
router.patch('/:id', ExamRoutineController.updateExamRoutine)
router.delete('/:id', ExamRoutineController.deleteExamRoutine)

export const ExamRoutineRoute = router
