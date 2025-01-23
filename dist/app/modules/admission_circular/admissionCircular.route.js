"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionCircularRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadPdf_1 = require("../../middlewares/uploadPdf");
const admissionCircular_controller_1 = require("./admissionCircular.controller");
const router = express_1.default.Router();
router.post('/', uploadPdf_1.uploadPDF.single('pdf'), admissionCircular_controller_1.AdmissionCircularController.createAdmissionCircular);
router.get('/', admissionCircular_controller_1.AdmissionCircularController.getAllAdmissionCircular);
router.get('/:id', admissionCircular_controller_1.AdmissionCircularController.getSingleAdmissionCircular);
router.patch('/:id', admissionCircular_controller_1.AdmissionCircularController.updateAdmissionCircular);
router.delete('/:id', admissionCircular_controller_1.AdmissionCircularController.deleteAdmissionCircular);
exports.AdmissionCircularRoute = router;
