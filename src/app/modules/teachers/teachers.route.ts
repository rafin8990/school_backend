import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { TeacherController } from './teachers.controller'

const router = express.Router()

router.post('/', upload.single('image'), TeacherController.createTeacher)
router.get('/', TeacherController.getAllTeachers)
router.get('/:id', TeacherController.getSingleTeacher)
router.patch('/:id', upload.single('image'), TeacherController.updateTeacher)
router.delete('/:id', TeacherController.deleteTeacher)

export const TeacherRoute = router
