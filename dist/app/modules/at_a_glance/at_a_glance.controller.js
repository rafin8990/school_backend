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
exports.AtAGlanceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const at_a_glance_constant_1 = require("./at_a_glance.constant");
const at_a_glance_service_1 = require("./at_a_glance.service");
const createAtAGlance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const at_a_glance = req.body;
    console.log({ at_a_glance, file });
    const slider = yield at_a_glance_service_1.AtAGlanceService.createAtAGlance(at_a_glance, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'at_a_glance created  Successfully',
        data: slider,
    });
}));
const getAllAtAGlance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, at_a_glance_constant_1.AtAGlanceFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield at_a_glance_service_1.AtAGlanceService.getAllAtAGlance(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'at_a_glance retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAtAGlance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const at_a_glanceId = req.params.id;
    const result = yield at_a_glance_service_1.AtAGlanceService.getSingleAtAGlance(at_a_glanceId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'at_a_glance retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateAtAGlance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const at_a_glanceId = req.params.id;
    const file = req.file;
    const at_a_glance_Data = req.body;
    const result = yield at_a_glance_service_1.AtAGlanceService.updateAtAGlance(at_a_glanceId, at_a_glance_Data, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'at_a_glance updated successfully',
        success: true,
        data: result,
    });
}));
const deleteAtAGlance = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const at_a_glance_Id = req.params.id;
    const result = yield at_a_glance_service_1.AtAGlanceService.deleteAtAGlance(at_a_glance_Id);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'at_a_glance deleted successfully',
        success: true,
        data: result,
    });
}));
exports.AtAGlanceController = {
    createAtAGlance,
    getAllAtAGlance,
    getSingleAtAGlance,
    updateAtAGlance,
    deleteAtAGlance,
};
