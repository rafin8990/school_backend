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
exports.PhotoController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const photo_constant_1 = require("./photo.constant");
const photo_service_1 = require("./photo.service");
const createPhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const photo = req.body;
    const data = yield photo_service_1.PhotoService.createPhoto(photo, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Photo created  Successfully',
        data: data,
    });
}));
const getAllPhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, photo_constant_1.PhotoFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield photo_service_1.PhotoService.getAllPhoto(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Photo retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSinglePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PhotoId = req.params.id;
    const result = yield photo_service_1.PhotoService.getSinglePhoto(PhotoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Photo retrieved successfully',
        success: true,
        data: result,
    });
}));
const updatePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PhotoId = req.params.id;
    const PhotoData = req.body;
    const result = yield photo_service_1.PhotoService.updatePhoto(PhotoId, PhotoData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Photo updated successfully',
        success: true,
        data: result,
    });
}));
const deletePhoto = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const PhotoId = req.params.id;
    const result = yield photo_service_1.PhotoService.deletePhoto(PhotoId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Photo deleted successfully',
        success: true,
        data: result,
    });
}));
exports.PhotoController = {
    createPhoto,
    getAllPhoto,
    getSinglePhoto,
    updatePhoto,
    deletePhoto,
};
