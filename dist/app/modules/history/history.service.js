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
exports.HistoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const history_constant_1 = require("./history.constant");
const history_model_1 = require("./history.model");
const createHistory = (history, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        history.image = `uploads/${file.filename}`;
    }
    const result = yield history_model_1.History.create(history);
    return result;
});
const getAllHistory = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: history_constant_1.HistorySearchableFields.map(field => ({
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
        const questions = yield history_model_1.History.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield history_model_1.History.countDocuments(whereConditions);
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
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve History');
    }
});
const getSingleHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield history_model_1.History.findById(id);
        if (!history) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'History not found');
        }
        return history;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve history');
    }
});
const updateHistory = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield history_model_1.History.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!history) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'history not found');
        }
        return history;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to update History');
    }
});
const deleteHistory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield history_model_1.History.findByIdAndDelete(id);
        if (!history) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'history not found');
        }
        return history;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to delete history');
    }
});
exports.HistoryService = {
    createHistory,
    getAllHistory,
    getSingleHistory,
    updateHistory,
    deleteHistory,
};
