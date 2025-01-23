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
exports.AdmissionResultService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const admissionResult_constant_1 = require("./admissionResult.constant");
const admissionResult_model_1 = require("./admissionResult.model");
const createAdmissionResult = (admissionResult, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        admissionResult.pdfUrl = `pdf/${file.filename}`;
    }
    return yield admissionResult_model_1.AdmissionResult.create(admissionResult);
});
const getAllAdmissionResults = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: admissionResult_constant_1.AdmissionResultSearchableFields.map(field => ({
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
    const results = yield admissionResult_model_1.AdmissionResult.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield admissionResult_model_1.AdmissionResult.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: results,
    };
});
const getSingleAdmissionResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admissionResult_model_1.AdmissionResult.findById(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admission Result not found');
    }
    return result;
});
const updateAdmissionResult = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        updateData.pdfUrl = `uploads/${file.filename}`;
    }
    const result = yield admissionResult_model_1.AdmissionResult.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admission Result not found');
    }
    return result;
});
const deleteAdmissionResult = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield admissionResult_model_1.AdmissionResult.findByIdAndDelete(id);
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admission Result not found');
    }
    return result;
});
exports.AdmissionResultService = {
    createAdmissionResult,
    getAllAdmissionResults,
    getSingleAdmissionResult,
    updateAdmissionResult,
    deleteAdmissionResult,
};
