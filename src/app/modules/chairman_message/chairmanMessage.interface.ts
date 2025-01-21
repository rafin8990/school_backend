import { Model } from 'mongoose'

export type IChairmanMessage = {
  message: string
  image: string
  name: string
  facebookURL?: string
  instagramURL?: string
  tweeterURL?: string
  youtubeURL?: string
}

export type ChairmanMessageModel = Model<
  IChairmanMessage,
  Record<string, unknown>
>
