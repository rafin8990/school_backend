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
exports.ChairmanMessageController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const chairmanMessage_constant_1 = require("./chairmanMessage.constant");
const chairmanMessage_service_1 = require("./chairmanMessage.service");
const createChairmanMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const ChairmanMessage = req.body;
    const data = yield chairmanMessage_service_1.ChairmanMessageService.createChairmanMessage(ChairmanMessage, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Chairman Message created  Successfully',
        data: data,
    });
}));
const getAllChairmanMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, chairmanMessage_constant_1.ChairmanMessageFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield chairmanMessage_service_1.ChairmanMessageService.getAllChairmanMessage(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Chairman Message retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleChairmanMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ChairmanMessageId = req.params.id;
    const result = yield chairmanMessage_service_1.ChairmanMessageService.getSingleChairmanMessage(ChairmanMessageId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Chairman Message retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateChairmanMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ChairmanMessageId = req.params.id;
    const ChairmanMessageData = req.body;
    const result = yield chairmanMessage_service_1.ChairmanMessageService.updateChairmanMessage(ChairmanMessageId, ChairmanMessageData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Chairman Message updated successfully',
        success: true,
        data: result,
    });
}));
const deleteChairmanMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ChairmanMessageId = req.params.id;
    const result = yield chairmanMessage_service_1.ChairmanMessageService.deleteChairmanMessage(ChairmanMessageId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Chairman Message deleted successfully',
        success: true,
        data: result,
    });
}));
exports.ChairmanMessageController = {
    createChairmanMessage,
    getAllChairmanMessage,
    getSingleChairmanMessage,
    updateChairmanMessage,
    deleteChairmanMessage,
};
