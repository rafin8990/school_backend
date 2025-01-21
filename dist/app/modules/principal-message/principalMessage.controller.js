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
exports.PrincipalMessageController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const principalMessage_constant_1 = require("./principalMessage.constant");
const principalMessage_service_1 = require("./principalMessage.service");
const createPrincipalMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const principalMessageData = req.body;
    const principalMessage = yield principalMessage_service_1.PrincipalMessageService.createPrincipalMessage(principalMessageData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Principal message created successfully',
        data: principalMessage,
    });
}));
const getAllPrincipalMessages = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, principalMessage_constant_1.PrincipalMessageFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield principalMessage_service_1.PrincipalMessageService.getAllPrincipalMessages(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Principal messages retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglePrincipalMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const principalMessageId = req.params.id;
    const result = yield principalMessage_service_1.PrincipalMessageService.getSinglePrincipalMessage(principalMessageId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Principal message retrieved successfully',
        success: true,
        data: result,
    });
}));
const updatePrincipalMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const principalMessageId = req.params.id;
    const file = req.file;
    const principalMessageData = req.body;
    const result = yield principalMessage_service_1.PrincipalMessageService.updatePrincipalMessage(principalMessageId, principalMessageData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Principal message updated successfully',
        success: true,
        data: result,
    });
}));
const deletePrincipalMessage = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const principalMessageId = req.params.id;
    const result = yield principalMessage_service_1.PrincipalMessageService.deletePrincipalMessage(principalMessageId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Principal message deleted successfully',
        success: true,
        data: result,
    });
}));
exports.PrincipalMessageController = {
    createPrincipalMessage,
    getAllPrincipalMessages,
    getSinglePrincipalMessage,
    updatePrincipalMessage,
    deletePrincipalMessage,
};
