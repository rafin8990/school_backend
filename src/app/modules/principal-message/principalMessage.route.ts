import express from 'express'
import { upload } from '../../middlewares/uploadImage'
import { PrincipalMessageController } from './principalMessage.controller'

const router = express.Router()

router.post(
  '/',
  upload.single('image'),
  PrincipalMessageController.createPrincipalMessage
)
router.get('/', PrincipalMessageController.getAllPrincipalMessages)
router.get('/:id', PrincipalMessageController.getSinglePrincipalMessage)
router.patch(
  '/:id',
  upload.single('image'),
  PrincipalMessageController.updatePrincipalMessage
)
router.delete('/:id', PrincipalMessageController.deletePrincipalMessage)

export const PrincipalMessageRoute = router
