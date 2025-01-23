"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionResultRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadPdf_1 = require("../../middlewares/uploadPdf");
const admissionResult_controller_1 = require("./admissionResult.controller");
const router = express_1.default.Router();
router.post('/', uploadPdf_1.uploadPDF.single('pdf'), admissionResult_controller_1.AdmissionResultController.createAdmissionResult);
router.get('/', admissionResult_controller_1.AdmissionResultController.getAllAdmissionResults);
router.get('/:id', admissionResult_controller_1.AdmissionResultController.getSingleAdmissionResult);
router.patch('/:id', uploadPdf_1.uploadPDF.single('pdf'), admissionResult_controller_1.AdmissionResultController.updateAdmissionResult);
router.delete('/:id', admissionResult_controller_1.AdmissionResultController.deleteAdmissionResult);
exports.AdmissionResultRoute = router;
