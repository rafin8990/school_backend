"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moduleRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const chairmanMessage_route_1 = require("../modules/chairman_message/chairmanMessage.route");
const features_route_1 = require("../modules/features/features.route");
const history_route_1 = require("../modules/history/history.route");
const InstituteMotto_route_1 = require("../modules/institute_motto/InstituteMotto.route");
const newsEvents_route_1 = require("../modules/news-events/newsEvents.route");
const notice_route_1 = require("../modules/notice/notice.route");
const photo_route_1 = require("../modules/photo/photo.route");
const principalMessage_route_1 = require("../modules/principal-message/principalMessage.route");
const info_route_1 = require("../modules/school_info/info.route");
const slider_route_1 = require("../modules/slider/slider.route");
const teachers_route_1 = require("../modules/teachers/teachers.route");
const user_route_1 = require("../modules/user/user.route");
const video_route_1 = require("../modules/video/video.route");
const at_a_glance_route_1 = require("./../modules/at_a_glance/at_a_glance.route");
const router = express_1.default.Router();
exports.moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.userRoutes,
    },
    {
        path: '/auth',
        route: auth_route_1.LoginRoutes,
    },
    {
        path: '/slider',
        route: slider_route_1.SliderRoute,
    },
    {
        path: '/info',
        route: info_route_1.InfoRoute,
    },
    {
        path: '/notice',
        route: notice_route_1.NoticeRoute,
    },
    {
        path: '/photo',
        route: photo_route_1.photoRoute,
    },
    {
        path: '/video',
        route: video_route_1.VideoRoute,
    },
    {
        path: '/chairman-message',
        route: chairmanMessage_route_1.ChairmanMessageRoute,
    },
    {
        path: '/principal-message',
        route: principalMessage_route_1.PrincipalMessageRoute,
    },
    {
        path: '/teachers',
        route: teachers_route_1.TeacherRoute,
    },
    {
        path: '/at-a-glance',
        route: at_a_glance_route_1.AtAGlanceRoute,
    },
    {
        path: '/institute-motto',
        route: InstituteMotto_route_1.InstituteMottoRoute,
    },
    {
        path: '/features',
        route: features_route_1.FeaturesRoute,
    },
    {
        path: '/news-events',
        route: newsEvents_route_1.NewsEventsRoute,
    },
    {
        path: '/history',
        route: history_route_1.historyRoute,
    },
];
exports.moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
