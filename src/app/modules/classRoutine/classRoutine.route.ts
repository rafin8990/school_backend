import express from 'express'
import { ClassRoutineController } from './classRoutine.controller'

const router = express.Router()

router.post('/', ClassRoutineController.createClassRoutine)
router.get('/', ClassRoutineController.getAllClassRoutines)
router.get('/:id', ClassRoutineController.getSingleClassRoutine)
router.patch('/:id', ClassRoutineController.updateClassRoutine)
router.delete('/:id', ClassRoutineController.deleteClassRoutine)

export const ClassRoutineRoute = router
