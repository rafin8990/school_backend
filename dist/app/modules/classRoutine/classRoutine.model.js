"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassRoutine = void 0;
const mongoose_1 = require("mongoose");
const classRoutineSchema = new mongoose_1.Schema({
    className: { type: String, required: true },
    section: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ClassRoutine = (0, mongoose_1.model)('ClassRoutine', classRoutineSchema);
