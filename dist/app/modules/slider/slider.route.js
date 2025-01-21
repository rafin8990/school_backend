"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const slider_controller_1 = require("./slider.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), slider_controller_1.SliderController.createSlider);
router.get('/', slider_controller_1.SliderController.getAllSlider);
router.get('/:id', slider_controller_1.SliderController.getSingleSlider);
router.patch('/:id', uploadImage_1.upload.single('image'), slider_controller_1.SliderController.updateSlider);
router.delete('/:id', slider_controller_1.SliderController.deleteSlider);
exports.SliderRoute = router;
