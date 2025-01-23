"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutineRoute = void 0;
const express_1 = __importDefault(require("express"));
const examRoutine_controller_1 = require("./examRoutine.controller");
const router = express_1.default.Router();
router.post('/', examRoutine_controller_1.ExamRoutineController.createExamRoutine);
router.get('/', examRoutine_controller_1.ExamRoutineController.getAllExamRoutines);
router.get('/:id', examRoutine_controller_1.ExamRoutineController.getSingleExamRoutine);
router.patch('/:id', examRoutine_controller_1.ExamRoutineController.updateExamRoutine);
router.delete('/:id', examRoutine_controller_1.ExamRoutineController.deleteExamRoutine);
exports.ExamRoutineRoute = router;
