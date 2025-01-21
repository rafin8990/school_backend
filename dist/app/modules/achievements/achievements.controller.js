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
exports.AchievementsController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const pagination_1 = require("../../constants/pagination");
const achievements_constant_1 = require("./achievements.constant");
const achievements_service_1 = require("./achievements.service");
const createAchievements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const achievementsData = req.body;
    const achievement = yield achievements_service_1.AchievementsService.createAchievements(achievementsData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Achievement created successfully',
        data: achievement,
    });
}));
const getAllAchievements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = Object.assign(Object.assign({}, (0, pick_1.default)(req.query, achievements_constant_1.AchievementsFilterableFields)), { searchTerm: req.query.searchTerm });
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
    const result = yield achievements_service_1.AchievementsService.getAllAchievements(filters, paginationOptions);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Achievements retrieved successfully',
        success: true,
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleAchievement = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const achievementId = req.params.id;
    const result = yield achievements_service_1.AchievementsService.getSingleAchievement(achievementId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Achievement retrieved successfully',
        success: true,
        data: result,
    });
}));
const updateAchievements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const achievementId = req.params.id;
    const file = req.file;
    const achievementsData = req.body;
    console.log({ achievementsData, achievementId });
    const result = yield achievements_service_1.AchievementsService.updateAchievements(achievementId, achievementsData, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Achievement updated successfully',
        success: true,
        data: result,
    });
}));
const deleteAchievements = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const achievementId = req.params.id;
    const result = yield achievements_service_1.AchievementsService.deleteAchievements(achievementId);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        message: 'Achievement deleted successfully',
        success: true,
        data: result,
    });
}));
exports.AchievementsController = {
    createAchievements,
    getAllAchievements,
    getSingleAchievement,
    updateAchievements,
    deleteAchievements,
};
