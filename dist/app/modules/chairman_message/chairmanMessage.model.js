"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChairmanMessage = void 0;
const mongoose_1 = require("mongoose");
const ChairmanMessageSchema = new mongoose_1.Schema({
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    name: {
        type: String,
    },
    facebookURL: {
        type: String,
    },
    instagramURL: {
        type: String,
    },
    youtubeURL: {
        type: String,
    },
    tweeterURL: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.ChairmanMessage = (0, mongoose_1.model)('ChairmanMessage', ChairmanMessageSchema);
