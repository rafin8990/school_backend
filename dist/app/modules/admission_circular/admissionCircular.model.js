"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdmissionCircular = void 0;
const mongoose_1 = require("mongoose");
const admissionCircularSchema = new mongoose_1.Schema({
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
exports.AdmissionCircular = (0, mongoose_1.model)('AdmissionCircular', admissionCircularSchema);
