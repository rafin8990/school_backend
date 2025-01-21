"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.History = void 0;
const mongoose_1 = require("mongoose");
const HistorySchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.History = (0, mongoose_1.model)('History', HistorySchema);
