"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticeRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadPdf_1 = require("../../middlewares/uploadPdf");
const notice_controller_1 = require("./notice.controller");
const router = express_1.default.Router();
router.post('/', uploadPdf_1.uploadPDF.single('pdf'), notice_controller_1.NoticeController.createNotice);
router.get('/', notice_controller_1.NoticeController.getAllNotice);
router.get('/:id', notice_controller_1.NoticeController.getSingleNotice);
router.patch('/:id', uploadPdf_1.uploadPDF.single('pdf'), notice_controller_1.NoticeController.updateNotice);
router.delete('/:id', notice_controller_1.NoticeController.deleteNotice);
exports.NoticeRoute = router;
