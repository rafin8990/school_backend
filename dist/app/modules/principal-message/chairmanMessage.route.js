"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChairmanMessageRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const chairmanMessage_controller_1 = require("./chairmanMessage.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), chairmanMessage_controller_1.ChairmanMessageController.createChairmanMessage);
router.get('/', chairmanMessage_controller_1.ChairmanMessageController.getAllChairmanMessage);
router.get('/:id', chairmanMessage_controller_1.ChairmanMessageController.getSingleChairmanMessage);
router.patch('/:id', chairmanMessage_controller_1.ChairmanMessageController.updateChairmanMessage);
router.delete('/:id', chairmanMessage_controller_1.ChairmanMessageController.deleteChairmanMessage);
exports.ChairmanMessageRoute = router;
