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
exports.FeaturesService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const features_constant_1 = require("./features.constant");
const features_model_1 = require("./features.model");
const createFeature = (feature, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        feature.image = `uploads/${file.filename}`;
    }
    const result = yield features_model_1.Features.create(feature);
    return result;
});
const getAllFeatures = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: features_constant_1.FeaturesSearchableFields.map(field => ({
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
        const features = yield features_model_1.Features.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield features_model_1.Features.countDocuments(whereConditions);
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: features,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve features');
    }
});
const getSingleFeature = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feature = yield features_model_1.Features.findById(id);
        if (!feature) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found');
        }
        return feature;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve feature');
    }
});
const updateFeature = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (file) {
            updateData.image = `uploads/${file.filename}`;
        }
        const feature = yield features_model_1.Features.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!feature) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found');
        }
        return feature;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to update feature');
    }
});
const deleteFeature = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feature = yield features_model_1.Features.findByIdAndDelete(id);
        if (!feature) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Feature not found');
        }
        return feature;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to delete feature');
    }
});
exports.FeaturesService = {
    createFeature,
    getAllFeatures,
    getSingleFeature,
    updateFeature,
    deleteFeature,
};
