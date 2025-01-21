"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtAGlanceRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const at_a_glance_controller_1 = require("./at_a_glance.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), at_a_glance_controller_1.AtAGlanceController.createAtAGlance);
router.get('/', at_a_glance_controller_1.AtAGlanceController.getAllAtAGlance);
router.get('/:id', at_a_glance_controller_1.AtAGlanceController.getSingleAtAGlance);
router.patch('/:id', uploadImage_1.upload.single('image'), at_a_glance_controller_1.AtAGlanceController.updateAtAGlance);
router.delete('/:id', at_a_glance_controller_1.AtAGlanceController.deleteAtAGlance);
exports.AtAGlanceRoute = router;
