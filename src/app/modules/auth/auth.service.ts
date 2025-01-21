import bcrypt from 'bcrypt'
import httpStatus from 'http-status'
import { Secret } from 'jsonwebtoken'
import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { jwtHelpers } from '../../../helper/jwtHelper'
import { User } from '../user/user.model'
import {
  ILogin,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface'
const loginUser = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { data, password } = payload
  const user = await User.findOne(
    {
      $or: [{ email: data }, { mobileNo: data }],
    },
    {
      mobileNo: 1,
      role: 1,
      email: 1,
      name: 1,
      image: 1,
      password: 1,
    }
  )

  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User Not found')
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password)
  console.log({ isPasswordMatched })

  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password did not match')
  }
  const accessToken = jwtHelpers.createToken(
    {
      mobileNo: user.mobileNo,
      role: user.role,
      email: user.email,
      name: user.name,
      image: user.image,
    },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    {
      mobileNo: user.mobileNo,
      role: user.role,
      email: user.email,
      name: user.name,
      image: user.image,
    },
    config.jwt_refresh_secret as Secret,
    config.jwt_refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User()
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt_refresh_secret as Secret
    )
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }

  const { data } = verifiedToken
  const isUserExist = await user.isUserExist(data)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const newAccessToken = jwtHelpers.createToken(
    { email: isUserExist?.email, role: isUserExist?.role },
    config.jwt_secret as Secret,
    config.jwt_expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}
export const AuthService = {
  loginUser,
  refreshToken,
}
