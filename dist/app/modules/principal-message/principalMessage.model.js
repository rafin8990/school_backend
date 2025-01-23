"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrincipalMessage = void 0;
const mongoose_1 = require("mongoose");
const principalMessageSchema = new mongoose_1.Schema({
    message: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    facebookURL: {
        type: String,
    },
    instagramURL: {
        type: String,
    },
    tweeterURL: {
        type: String,
    },
    youtubeURL: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.PrincipalMessage = (0, mongoose_1.model)('PrincipalMessage', principalMessageSchema);
