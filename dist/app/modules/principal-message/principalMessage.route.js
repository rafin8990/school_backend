"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalMessageRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const principalMessage_controller_1 = require("./principalMessage.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), principalMessage_controller_1.PrincipalMessageController.createPrincipalMessage);
router.get('/', principalMessage_controller_1.PrincipalMessageController.getAllPrincipalMessages);
router.get('/:id', principalMessage_controller_1.PrincipalMessageController.getSinglePrincipalMessage);
router.patch('/:id', uploadImage_1.upload.single('image'), principalMessage_controller_1.PrincipalMessageController.updatePrincipalMessage);
router.delete('/:id', principalMessage_controller_1.PrincipalMessageController.deletePrincipalMessage);
exports.PrincipalMessageRoute = router;
