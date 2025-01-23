"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturesRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const features_controller_1 = require("./features.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), features_controller_1.FeaturesController.createFeature);
router.get('/', features_controller_1.FeaturesController.getAllFeatures);
router.get('/:id', features_controller_1.FeaturesController.getSingleFeature);
router.patch('/:id', uploadImage_1.upload.single('image'), features_controller_1.FeaturesController.updateFeature);
router.delete('/:id', features_controller_1.FeaturesController.deleteFeature);
exports.FeaturesRoute = router;
