"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = require("mongoose");
const VideoSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    link: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Video = (0, mongoose_1.model)('Video', VideoSchema);
