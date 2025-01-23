"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutineController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const examRoutine_constant_1 = require("./examRoutine.constant");
const examRoutine_service_1 = require("./examRoutine.service");
const createExamRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutineData = req.body;
    const examRoutine = yield examRoutine_service_1.ExamRoutineService.createExamRoutine(examRoutineData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Exam routine created successfully',
        data: examRoutine,
    });
}));
const getAllExamRoutines = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, examRoutine_constant_1.ExamRoutineFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield examRoutine_service_1.ExamRoutineService.getAllExamRoutines(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Exam routines retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleExamRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutineId = req.params.id;
    const result = yield examRoutine_service_1.ExamRoutineService.getSingleExamRoutine(examRoutineId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Exam routine retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateExamRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutineId = req.params.id;
    const examRoutineData = req.body;
    const result = yield examRoutine_service_1.ExamRoutineService.updateExamRoutine(examRoutineId, examRoutineData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Exam routine updated successfully',
        success: true,
        data: result,
    });
}));
const deleteExamRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutineId = req.params.id;
    const result = yield examRoutine_service_1.ExamRoutineService.deleteExamRoutine(examRoutineId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Exam routine deleted successfully',
        success: true,
        data: result,
    });
}));
exports.ExamRoutineController = {
    createExamRoutine,
    getAllExamRoutines,
    getSingleExamRoutine,
    updateExamRoutine,
    deleteExamRoutine,
};
