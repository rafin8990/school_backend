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
exports.NewsEventsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const newsEvents_constant_1 = require("./newsEvents.constant");
const newsEvents_service_1 = require("./newsEvents.service");
const createNewsEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const newsEventData = req.body;
    const newsEvent = yield newsEvents_service_1.NewsEventsService.createNewsEvent(newsEventData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'News/Event created successfully',
        data: newsEvent,
    });
}));
const getAllNewsEvents = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, newsEvents_constant_1.NewsEventsFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield newsEvents_service_1.NewsEventsService.getAllNewsEvents(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'News/Events retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleNewsEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsEventId = req.params.id;
    const result = yield newsEvents_service_1.NewsEventsService.getSingleNewsEvent(newsEventId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'News/Event retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateNewsEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsEventId = req.params.id;
    const file = req.file;
    const newsEventData = req.body;
    const result = yield newsEvents_service_1.NewsEventsService.updateNewsEvent(newsEventId, newsEventData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'News/Event updated successfully',
        success: true,
        data: result,
    });
}));
const deleteNewsEvent = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newsEventId = req.params.id;
    const result = yield newsEvents_service_1.NewsEventsService.deleteNewsEvent(newsEventId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'News/Event deleted successfully',
        success: true,
        data: result,
    });
}));
exports.NewsEventsController = {
    createNewsEvent,
    getAllNewsEvents,
    getSingleNewsEvent,
    updateNewsEvent,
    deleteNewsEvent,
};
