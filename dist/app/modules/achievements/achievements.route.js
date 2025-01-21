"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementsRoute = void 0;
const express_1 = __importDefault(require("express"));
const uploadImage_1 = require("../../middlewares/uploadImage");
const achievements_controller_1 = require("./achievements.controller");
const router = express_1.default.Router();
router.post('/', uploadImage_1.upload.single('image'), achievements_controller_1.AchievementsController.createAchievements);
router.get('/', achievements_controller_1.AchievementsController.getAllAchievements);
router.get('/:id', achievements_controller_1.AchievementsController.getSingleAchievement);
router.patch('/:id', uploadImage_1.upload.single('image'), achievements_controller_1.AchievementsController.updateAchievements);
router.delete('/:id', achievements_controller_1.AchievementsController.deleteAchievements);
exports.AchievementsRoute = router;
