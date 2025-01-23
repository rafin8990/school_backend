"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeacherRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const teachers_controller_1 = require("./teachers.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), teachers_controller_1.TeacherController.createTeacher);
router.get('/', teachers_controller_1.TeacherController.getAllTeachers);
router.get('/:id', teachers_controller_1.TeacherController.getSingleTeacher);
router.patch('/:id', uploadImage_1.upload.single('image'), teachers_controller_1.TeacherController.updateTeacher);
router.delete('/:id', teachers_controller_1.TeacherController.deleteTeacher);
exports.TeacherRoute = router;
