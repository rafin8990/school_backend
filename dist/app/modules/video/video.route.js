"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const video_controller_1 = require("./video.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('thumbnail'), video_controller_1.VideoController.createVideo);
router.get('/', video_controller_1.VideoController.getAllVideo);
router.get('/:id', video_controller_1.VideoController.getSingleVideo);
router.patch('/:id', video_controller_1.VideoController.updateVideo);
router.delete('/:id', video_controller_1.VideoController.deleteVideo);
exports.VideoRoute = router;
