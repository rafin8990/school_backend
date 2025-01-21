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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const video_constant_1 = require("./video.constant");
const video_model_1 = require("./video.model");
const createVideo = (video, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        video.thumbnail = `uploads/${file.filename}`;
    }
    const result = yield video_model_1.Video.create(video);
    return result;
});
const getAllVideo = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: video_constant_1.VideoSearchableFields.map(field => ({
                    [field]: {
                        $regex: searchTerm,
                        $options: 'i',
                    },
                })),
            });
        }
        if (Object.keys(filtersData).length) {
            andConditions.push({
                $and: Object.entries(filtersData).map(([field, value]) => ({
                    [field]: value,
                })),
            });
        }
        const sortConditions = {};
        if (sortBy && sortOrder) {
            sortConditions[sortBy] = sortOrder;
        }
        const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
        const questions = yield video_model_1.Video.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield video_model_1.Video.countDocuments(whereConditions);
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: questions,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve Video');
    }
});
const getSingleVideo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_model_1.Video.findById(id);
        if (!video) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'video not found');
        }
        return video;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve video');
    }
});
const updateVideo = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_model_1.Video.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!video) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'video not found');
        }
        return video;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to update video');
    }
});
const deleteVideo = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_model_1.Video.findByIdAndDelete(id);
        if (!video) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'video not found');
        }
        return video;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to delete video');
    }
});
exports.VideoService = {
    createVideo,
    getAllVideo,
    getSingleVideo,
    updateVideo,
    deleteVideo,
};
