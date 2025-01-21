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
exports.InfoController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const info_service_1 = require("./info.service");
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const info_constant_1 = require("./info.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const createInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const info = req.body;
    const data = yield info_service_1.InfoService.createInfo(info, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'School created  Successfully',
        data: data,
    });
}));
const getAllInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, info_constant_1.InfoFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield info_service_1.InfoService.getAllInfo(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Info retrieved successfully",
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const InfoId = req.params.id;
    const result = yield info_service_1.InfoService.getSingleInfo(InfoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Info retrieved successfully",
        success: true,
        data: result,
    });
}));
const updateInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const InfoId = req.params.id;
    const file = req.file;
    const InfoData = req.body;
    const result = yield info_service_1.InfoService.updateInfo(InfoId, InfoData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Info updated successfully",
        success: true,
        data: result,
    });
}));
const deleteInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const InfoId = req.params.id;
    const result = yield info_service_1.InfoService.deleteInfo(InfoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: "Info deleted successfully",
        success: true,
        data: result,
    });
}));
exports.InfoController = {
    createInfo,
    getAllInfo,
    getSingleInfo,
    updateInfo,
    deleteInfo
};
