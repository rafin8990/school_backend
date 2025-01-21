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
exports.PrincipalMessageService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helper/paginationHelper");
const principalMessage_constant_1 = require("./principalMessage.constant");
const principalMessage_model_1 = require("./principalMessage.model");
const createPrincipalMessage = (principalMessage, file) => __awaiter(void 0, void 0, void 0, function* () {
    if (!file) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'File Not Found');
    }
    if (file) {
        principalMessage.image = `uploads/${file.filename}`;
    }
    const result = yield principalMessage_model_1.PrincipalMessage.create(principalMessage);
    return result;
});
const getAllPrincipalMessages = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
        const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
        const andConditions = [];
        if (searchTerm) {
            andConditions.push({
                $or: principalMessage_constant_1.PrincipalMessageSearchableFields.map(field => ({
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
        const principalMessages = yield principalMessage_model_1.PrincipalMessage.find(whereConditions)
            .sort(sortConditions)
            .skip(skip)
            .limit(limit);
        const total = yield principalMessage_model_1.PrincipalMessage.countDocuments(whereConditions);
        return {
            meta: {
                page,
                limit,
                total,
            },
            data: principalMessages,
        };
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve principal messages');
    }
});
const getSinglePrincipalMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const principalMessage = yield principalMessage_model_1.PrincipalMessage.findById(id);
        if (!principalMessage) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Principal message not found');
        }
        return principalMessage;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to retrieve principal message');
    }
});
const updatePrincipalMessage = (id, updateData, file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (file) {
            updateData.image = `uploads/${file.filename}`;
        }
        const principalMessage = yield principalMessage_model_1.PrincipalMessage.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });
        if (!principalMessage) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Principal message not found');
        }
        return principalMessage;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to update principal message');
    }
});
const deletePrincipalMessage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const principalMessage = yield principalMessage_model_1.PrincipalMessage.findByIdAndDelete(id);
        if (!principalMessage) {
            throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Principal message not found');
        }
        return principalMessage;
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Unable to delete principal message');
    }
});
exports.PrincipalMessageService = {
    createPrincipalMessage,
    getAllPrincipalMessages,
    getSinglePrincipalMessage,
    updatePrincipalMessage,
    deletePrincipalMessage,
};
