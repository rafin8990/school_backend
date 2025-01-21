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
exports.InstituteMottoController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const InstituteMotto_constant_1 = require("./InstituteMotto.constant");
const InstituteMotto_service_1 = require("./InstituteMotto.service");
const createInstituteMotto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const status = req.body;
    const instituteMotto = yield InstituteMotto_service_1.InstituteMottoService.createInstituteMotto(status, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Institute Motto created successfully',
        data: instituteMotto,
    });
}));
const getAllInstituteMotto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, InstituteMotto_constant_1.InstituteMottoFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield InstituteMotto_service_1.InstituteMottoService.getAllInstituteMotto(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Institute Motto retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleInstituteMotto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instituteMottoId = req.params.id;
    const result = yield InstituteMotto_service_1.InstituteMottoService.getSingleInstituteMotto(instituteMottoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Institute Motto retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateInstituteMotto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instituteMottoId = req.params.id;
    const file = req.file;
    const instituteMottoData = req.body;
    const result = yield InstituteMotto_service_1.InstituteMottoService.updateInstituteMotto(instituteMottoId, instituteMottoData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Institute Motto updated successfully',
        success: true,
        data: result,
    });
}));
const deleteInstituteMotto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const instituteMottoId = req.params.id;
    const result = yield InstituteMotto_service_1.InstituteMottoService.deleteInstituteMotto(instituteMottoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Institute Motto deleted successfully',
        success: true,
        data: result,
    });
}));
exports.InstituteMottoController = {
    createInstituteMotto,
    getAllInstituteMotto,
    getSingleInstituteMotto,
    updateInstituteMotto,
    deleteInstituteMotto,
};
