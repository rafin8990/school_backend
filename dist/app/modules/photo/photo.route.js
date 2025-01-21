"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.photoRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const photo_controller_1 = require("./photo.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), photo_controller_1.PhotoController.createPhoto);
router.get('/', photo_controller_1.PhotoController.getAllPhoto);
router.get('/:id', photo_controller_1.PhotoController.getSinglePhoto);
router.patch('/:id', photo_controller_1.PhotoController.updatePhoto);
router.delete('/:id', photo_controller_1.PhotoController.deletePhoto);
exports.photoRoute = router;
