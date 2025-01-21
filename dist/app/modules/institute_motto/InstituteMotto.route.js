"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteMottoRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const InstituteMotto_controller_1 = require("./InstituteMotto.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), InstituteMotto_controller_1.InstituteMottoController.createInstituteMotto);
router.get('/', InstituteMotto_controller_1.InstituteMottoController.getAllInstituteMotto);
router.get('/:id', InstituteMotto_controller_1.InstituteMottoController.getSingleInstituteMotto);
router.patch('/:id', uploadImage_1.upload.single('image'), InstituteMotto_controller_1.InstituteMottoController.updateInstituteMotto);
router.delete('/:id', InstituteMotto_controller_1.InstituteMottoController.deleteInstituteMotto);
exports.InstituteMottoRoute = router;
