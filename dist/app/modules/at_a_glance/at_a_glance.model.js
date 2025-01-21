"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtAGlance = void 0;
const mongoose_1 = require("mongoose");
const AtAGlanceSchema = new mongoose_1.Schema({
    image: {
        type: String,
    },
    title: {
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
exports.AtAGlance = (0, mongoose_1.model)('AtAGlance', AtAGlanceSchema);
