"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = require("zod");
const LoginZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        data: zod_1.z.string({
            required_error: 'Email or Mobile Number is required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh token is required',
        }),
    }),
});
exports.AuthValidation = {
    LoginZodSchema,
    refreshTokenZodSchema,
};
