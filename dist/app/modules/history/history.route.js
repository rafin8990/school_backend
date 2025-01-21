"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.historyRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const history_controller_1 = require("./history.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), history_controller_1.HistoryController.createHistory);
router.get('/', history_controller_1.HistoryController.getAllHistory);
router.get('/:id', history_controller_1.HistoryController.getSingleHistory);
router.patch('/:id', history_controller_1.HistoryController.updateHistory);
router.delete('/:id', history_controller_1.HistoryController.deleteHistory);
exports.historyRoute = router;
