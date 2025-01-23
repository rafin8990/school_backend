"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsEvents = void 0;
const mongoose_1 = require("mongoose");
const newsEventsSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['news', 'event'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.NewsEvents = (0, mongoose_1.model)('NewsEvents', newsEventsSchema);
