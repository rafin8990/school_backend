"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Features = void 0;
const mongoose_1 = require("mongoose");
const HistorySchema = new mongoose_1.Schema({
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
exports.Features = (0, mongoose_1.model)('Feature', HistorySchema);
