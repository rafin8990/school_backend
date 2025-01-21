export type ILogin = {
    data: string
    password: string
  }
  
  export type ILoginUserResponse = {
    accessToken: string
    refreshToken?: string
  }
  
  export type IRefreshTokenResponse = {
    accessToken: string
  }