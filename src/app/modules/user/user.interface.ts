import { Model } from 'mongoose'
export type IUser = {
  name: string
  email: string
  mobileNo: string
  role: 'super_admin' | 'admin' | 'user'
  password: string
  image?: string
}

export type IUserMethod = {
  isUserExist(data: string): Promise<Partial<IUser> | null>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type userModel = Model<IUser, Record<string, unknown>, IUserMethod>
