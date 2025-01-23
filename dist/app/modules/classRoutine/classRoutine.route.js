"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRoutineRoute = void 0;
const express_1 = __importDefault(require("express"));
const classRoutine_controller_1 = require("./classRoutine.controller");
const router = express_1.default.Router();
router.post('/', classRoutine_controller_1.ClassRoutineController.createClassRoutine);
router.get('/', classRoutine_controller_1.ClassRoutineController.getAllClassRoutines);
router.get('/:id', classRoutine_controller_1.ClassRoutineController.getSingleClassRoutine);
router.patch('/:id', classRoutine_controller_1.ClassRoutineController.updateClassRoutine);
router.delete('/:id', classRoutine_controller_1.ClassRoutineController.deleteClassRoutine);
exports.ClassRoutineRoute = router;
