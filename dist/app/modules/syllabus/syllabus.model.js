"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Syllabus = void 0;
const mongoose_1 = require("mongoose");
const syllabusSchema = new mongoose_1.Schema({
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
exports.Syllabus = (0, mongoose_1.model)('Syllabus', syllabusSchema);
