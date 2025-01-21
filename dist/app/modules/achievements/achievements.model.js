"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Achievements = void 0;
const mongoose_1 = require("mongoose");
const achievementsSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Achievements = (0, mongoose_1.model)('Achievements', achievementsSchema);
