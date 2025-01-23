"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyllabusRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadPdf_1 = require("../../middlewares/uploadPdf");
const syllabus_controller_1 = require("./syllabus.controller");
const router = express_1.default.Router();
router.post('/', uploadPdf_1.uploadPDF.single('pdf'), syllabus_controller_1.SyllabusController.createSyllabus);
router.get('/', syllabus_controller_1.SyllabusController.getAllSyllabus);
router.get('/:id', syllabus_controller_1.SyllabusController.getSingleSyllabus);
router.patch('/:id', uploadPdf_1.uploadPDF.single('pdf'), syllabus_controller_1.SyllabusController.updateSyllabus);
router.delete('/:id', syllabus_controller_1.SyllabusController.deleteSyllabus);
exports.SyllabusRoute = router;
