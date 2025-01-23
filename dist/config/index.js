"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const config = {
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL || '',
    bycrypt_sault_round: 12,
    env: 'development',
    emailHost: 'http://localhost:5000/',
    emailPort: 587,
    emailUser: process.env.EMAIL_USER,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailFrom: process.env.EMAIL_FORM,
    jwt_secret: 'secret',
    jwt_expires_in: '1d',
    jwt_refresh_secret: 'very very secret',
    jwt_refresh_expires_in: '365d',
    node_email: process.env.NODE_MAILER_EMAIL,
    node_pass: process.env.NODE_MAILER_PASS,
};
exports.default = config;
