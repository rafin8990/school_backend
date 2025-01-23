"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Slider = void 0;
const mongoose_1 = require("mongoose");
const sliderSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Slider = (0, mongoose_1.model)('Slider', sliderSchema);
