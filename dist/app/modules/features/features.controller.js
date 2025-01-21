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
exports.FeaturesController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const features_constant_1 = require("./features.constant");
const features_service_1 = require("./features.service");
const createFeature = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const data = req.body;
    const feature = yield features_service_1.FeaturesService.createFeature(data, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Feature created successfully',
        data: feature,
    });
}));
const getAllFeatures = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, features_constant_1.FeaturesFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield features_service_1.FeaturesService.getAllFeatures(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Features retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleFeature = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureId = req.params.id;
    const result = yield features_service_1.FeaturesService.getSingleFeature(featureId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Feature retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateFeature = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureId = req.params.id;
    const file = req.file;
    const featureData = req.body;
    const result = yield features_service_1.FeaturesService.updateFeature(featureId, featureData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Feature updated successfully',
        success: true,
        data: result,
    });
}));
const deleteFeature = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const featureId = req.params.id;
    const result = yield features_service_1.FeaturesService.deleteFeature(featureId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Feature deleted successfully',
        success: true,
        data: result,
    });
}));
exports.FeaturesController = {
    createFeature,
    getAllFeatures,
    getSingleFeature,
    updateFeature,
    deleteFeature,
};
