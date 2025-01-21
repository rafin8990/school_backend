import { Model } from 'mongoose'

export type IPrincipalMessage = {
  message: string
  image: string
  name: string
  facebookURL?: string
  instagramURL?: string
  tweeterURL?: string
  youtubeURL?: string
}

export type PrincipalMessageModel = Model<
  IPrincipalMessage,
  Record<string, unknown>
>
