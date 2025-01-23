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
exports.AdmissionCircularController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const admissionCircular_constant_1 = require("./admissionCircular.constant");
const admissionCircular_service_1 = require("./admissionCircular.service");
const createAdmissionCircular = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const circular = req.body;
    const admissionCircular = yield admissionCircular_service_1.AdmissionCircularService.createAdmissionCircular(circular, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Admission Circular created successfully',
        data: admissionCircular,
    });
}));
const getAllAdmissionCircular = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, admissionCircular_constant_1.AdmissionCircularFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield admissionCircular_service_1.AdmissionCircularService.getAllAdmissionCircular(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Circulars retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAdmissionCircular = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admissionCircular_service_1.AdmissionCircularService.getSingleAdmissionCircular(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Circular retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateAdmissionCircular = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updateData = req.body;
    const result = yield admissionCircular_service_1.AdmissionCircularService.updateAdmissionCircular(id, updateData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Circular updated successfully',
        success: true,
        data: result,
    });
}));
const deleteAdmissionCircular = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield admissionCircular_service_1.AdmissionCircularService.deleteAdmissionCircular(id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Admission Circular deleted successfully',
        success: true,
        data: result,
    });
}));
exports.AdmissionCircularController = {
    createAdmissionCircular,
    getAllAdmissionCircular,
    getSingleAdmissionCircular,
    updateAdmissionCircular,
    deleteAdmissionCircular,
};
