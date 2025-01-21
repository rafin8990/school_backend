import { z } from 'zod'

const LoginZodSchema = z.object({
  body: z.object({
    data: z.string({
      required_error: 'Email or Mobile Number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
})

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required',
    }),
  }),
})

export const AuthValidation = {
  LoginZodSchema,
  refreshTokenZodSchema,
}
