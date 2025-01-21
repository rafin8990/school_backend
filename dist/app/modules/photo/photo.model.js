"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Photo = void 0;
const mongoose_1 = require("mongoose");
const PhotoSchema = new mongoose_1.Schema({
    title: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Photo = (0, mongoose_1.model)('Photo', PhotoSchema);
