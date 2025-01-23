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
exports.TeacherService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const teachers_constant_1 = require("./teachers.constant");
const teachers_model_1 = require("./teachers.model");
const createTeacher = (teacher, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'File Not Found');
    }
    if (file) {
        teacher.image = `uploads/${file.filename}`;
    }
    const result = yield teachers_model_1.Teacher.create(teacher);
    return result;
});
const getAllTeachers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: teachers_constant_1.TeacherSearchableFields.map(field => ({
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
    const teachers = yield teachers_model_1.Teacher.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield teachers_model_1.Teacher.countDocuments(whereConditions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: teachers,
    };
});
const getSingleTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teachers_model_1.Teacher.findById(id);
    if (!teacher) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Teacher not found');
    }
    return teacher;
});
const updateTeacher = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        updateData.image = `uploads/${file.filename}`;
    }
    const teacher = yield teachers_model_1.Teacher.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
    });
    if (!teacher) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Teacher not found');
    }
    return teacher;
});
const deleteTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teachers_model_1.Teacher.findByIdAndDelete(id);
    if (!teacher) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Teacher not found');
    }
    return teacher;
});
exports.TeacherService = {
    createTeacher,
    getAllTeachers,
    getSingleTeacher,
    updateTeacher,
    deleteTeacher,
};
