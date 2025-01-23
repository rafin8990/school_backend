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
exports.AdmissionResultController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const admissionResult_constant_1 = require("./admissionResult.constant");
const admissionResult_service_1 = require("./admissionResult.service");
const createAdmissionResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const admissionResultData = req.body;
    const admissionResult = yield admissionResult_service_1.AdmissionResultService.createAdmissionResult(admissionResultData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admission Result created successfully',
        data: admissionResult,
    });
}));
const getAllAdmissionResults = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, admissionResult_constant_1.AdmissionResultFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield admissionResult_service_1.AdmissionResultService.getAllAdmissionResults(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Results retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAdmissionResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissionResultId = req.params.id;
    const result = yield admissionResult_service_1.AdmissionResultService.getSingleAdmissionResult(admissionResultId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Result retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateAdmissionResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissionResultId = req.params.id;
    const file = req.file;
    const admissionResultData = req.body;
    const result = yield admissionResult_service_1.AdmissionResultService.updateAdmissionResult(admissionResultId, admissionResultData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Result updated successfully',
        success: true,
        data: result,
    });
}));
const deleteAdmissionResult = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const admissionResultId = req.params.id;
    const result = yield admissionResult_service_1.AdmissionResultService.deleteAdmissionResult(admissionResultId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Result deleted successfully',
        success: true,
        data: result,
    });
}));
exports.AdmissionResultController = {
    createAdmissionResult,
    getAllAdmissionResults,
    getSingleAdmissionResult,
    updateAdmissionResult,
    deleteAdmissionResult,
};
