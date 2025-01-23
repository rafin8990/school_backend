"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEventsRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const newsEvents_controller_1 = require("./newsEvents.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), newsEvents_controller_1.NewsEventsController.createNewsEvent);
router.get('/', newsEvents_controller_1.NewsEventsController.getAllNewsEvents);
router.get('/:id', newsEvents_controller_1.NewsEventsController.getSingleNewsEvent);
router.patch('/:id', uploadImage_1.upload.single('image'), newsEvents_controller_1.NewsEventsController.updateNewsEvent);
router.delete('/:id', newsEvents_controller_1.NewsEventsController.deleteNewsEvent);
exports.NewsEventsRoute = router;
