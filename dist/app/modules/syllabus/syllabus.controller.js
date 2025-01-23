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
exports.SyllabusController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const syllabus_constant_1 = require("./syllabus.constant");
const syllabus_service_1 = require("./syllabus.service");
const createSyllabus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const syllabusData = req.body;
    const syllabus = yield syllabus_service_1.SyllabusService.createSyllabus(syllabusData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Syllabus created Successfully',
        data: syllabus,
    });
}));
const getAllSyllabus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, syllabus_constant_1.SyllabusFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield syllabus_service_1.SyllabusService.getAllSyllabus(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Syllabus retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSyllabus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const syllabusId = req.params.id;
    const result = yield syllabus_service_1.SyllabusService.getSingleSyllabus(syllabusId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Syllabus retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateSyllabus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const syllabusId = req.params.id;
    const file = req.file;
    const syllabusData = req.body;
    const result = yield syllabus_service_1.SyllabusService.updateSyllabus(syllabusId, syllabusData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Syllabus updated successfully',
        success: true,
        data: result,
    });
}));
const deleteSyllabus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const syllabusId = req.params.id;
    const result = yield syllabus_service_1.SyllabusService.deleteSyllabus(syllabusId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Syllabus deleted successfully',
        success: true,
        data: result,
    });
}));
exports.SyllabusController = {
    createSyllabus,
    getAllSyllabus,
    getSingleSyllabus,
    updateSyllabus,
    deleteSyllabus,
};
