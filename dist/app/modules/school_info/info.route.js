"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const info_controller_1 = require("./info.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('logo'), info_controller_1.InfoController.createInfo);
router.get('/', info_controller_1.InfoController.getAllInfo);
router.get('/:id', info_controller_1.InfoController.getSingleInfo);
router.patch('/:id', uploadImage_1.upload.single('logo'), info_controller_1.InfoController.updateInfo);
router.delete('/:id', info_controller_1.InfoController.deleteInfo);
exports.InfoRoute = router;
