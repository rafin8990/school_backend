"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionResult = void 0;
const mongoose_1 = require("mongoose");
const admissionResultSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.AdmissionResult = (0, mongoose_1.model)('AdmissionResult', admissionResultSchema);
