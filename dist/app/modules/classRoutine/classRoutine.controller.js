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
exports.ClassRoutineController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const classRoutine_constant_1 = require("./classRoutine.constant");
const classRoutine_service_1 = require("./classRoutine.service");
const createClassRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoutineData = req.body;
    const classRoutine = yield classRoutine_service_1.ClassRoutineService.createClassRoutine(classRoutineData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Class routine created successfully',
        data: classRoutine,
    });
}));
const getAllClassRoutines = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, classRoutine_constant_1.ClassRoutineFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield classRoutine_service_1.ClassRoutineService.getAllClassRoutines(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Class routines retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleClassRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoutineId = req.params.id;
    const result = yield classRoutine_service_1.ClassRoutineService.getSingleClassRoutine(classRoutineId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Class routine retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateClassRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoutineId = req.params.id;
    const classRoutineData = req.body;
    const result = yield classRoutine_service_1.ClassRoutineService.updateClassRoutine(classRoutineId, classRoutineData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Class routine updated successfully',
        success: true,
        data: result,
    });
}));
const deleteClassRoutine = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const classRoutineId = req.params.id;
    const result = yield classRoutine_service_1.ClassRoutineService.deleteClassRoutine(classRoutineId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Class routine deleted successfully',
        success: true,
        data: result,
    });
}));
exports.ClassRoutineController = {
    createClassRoutine,
    getAllClassRoutines,
    getSingleClassRoutine,
    updateClassRoutine,
    deleteClassRoutine,
};
