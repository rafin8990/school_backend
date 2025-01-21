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
exports.SliderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const slider_constant_1 = require("./slider.constant");
const slider_service_1 = require("./slider.service");
const createSlider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const status = req.body;
    const slider = yield slider_service_1.SliderService.createSlider(status, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Slide created  Successfully',
        data: slider,
    });
}));
const getAllSlider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, slider_constant_1.SliderFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield slider_service_1.SliderService.getAllSlider(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Slider retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleSlider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sliderId = req.params.id;
    const result = yield slider_service_1.SliderService.getSingleSlider(sliderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Slider retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateSlider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sliderId = req.params.id;
    const file = req.file;
    const sliderData = req.body;
    console.log({ sliderData, sliderId });
    const result = yield slider_service_1.SliderService.updateSlider(sliderId, sliderData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Slider updated successfully',
        success: true,
        data: result,
    });
}));
const deleteSlider = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sliderId = req.params.id;
    const result = yield slider_service_1.SliderService.deleteSlider(sliderId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Slider deleted successfully',
        success: true,
        data: result,
    });
}));
exports.SliderController = {
    createSlider,
    getAllSlider,
    getSingleSlider,
    updateSlider,
    deleteSlider,
};
