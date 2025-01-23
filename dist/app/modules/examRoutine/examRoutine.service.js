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
exports.ExamRoutineService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const examRoutine_constant_1 = require("./examRoutine.constant");
const examRoutine_model_1 = require("./examRoutine.model");
const createExamRoutine = (examRoutine) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield examRoutine_model_1.ExamRoutine.create(examRoutine);
    return result;
});
const getAllExamRoutines = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: examRoutine_constant_1.ExamRoutineSearchableFields.map(field => ({
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
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield examRoutine_model_1.ExamRoutine.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield examRoutine_model_1.ExamRoutine.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleExamRoutine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutine = yield examRoutine_model_1.ExamRoutine.findById(id);
    if (!examRoutine) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Exam routine not found');
    }
    return examRoutine;
});
const updateExamRoutine = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutine = yield examRoutine_model_1.ExamRoutine.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!examRoutine) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Exam routine not found');
    }
    return examRoutine;
});
const deleteExamRoutine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const examRoutine = yield examRoutine_model_1.ExamRoutine.findByIdAndDelete(id);
    if (!examRoutine) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Exam routine not found');
    }
    return examRoutine;
});
exports.ExamRoutineService = {
    createExamRoutine,
    getAllExamRoutines,
    getSingleExamRoutine,
    updateExamRoutine,
    deleteExamRoutine,
};
