"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExamRoutine = void 0;
const mongoose_1 = require("mongoose");
const examRoutineSchema = new mongoose_1.Schema({
    examName: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ExamRoutine = (0, mongoose_1.model)('ExamRoutine', examRoutineSchema);
