"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadPDF = void 0;
const http_status_1 = __importDefault(require("http-status"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'dist/pdf/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        const error = new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Only PDF files are allowed');
        console.error(error.message);
        cb(null, false);
    }
};
exports.uploadPDF = (0, multer_1.default)({ storage, fileFilter });
