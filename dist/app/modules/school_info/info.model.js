"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Info = void 0;
const mongoose_1 = require("mongoose");
const infoSchema = new mongoose_1.Schema({
    logo: {
        type: String,
    },
    school_name: {
        type: String,
    },
    address: {
        type: String,
    },
    eiin: {
        type: Number,
    },
    school_code: {
        type: Number,
    },
    email: {
        type: String,
    },
    mobile_no: {
        type: String,
    },
    website: {
        type: String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Info = (0, mongoose_1.model)('Info', infoSchema);
