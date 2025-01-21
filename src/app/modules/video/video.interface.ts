import { Model } from 'mongoose'

export type IVideo = {
  title: string
  link: string
  thumbnail: string
}

export type VideoModel = Model<IVideo, Record<string, unknown>>
