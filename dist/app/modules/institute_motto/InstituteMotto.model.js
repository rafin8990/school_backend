"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstituteMotto = void 0;
const mongoose_1 = require("mongoose");
const instituteMottoSchema = new mongoose_1.Schema({
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.InstituteMotto = (0, mongoose_1.model)('InstituteMotto', instituteMottoSchema);
