import { Model } from 'mongoose'

export type IPhoto = {
  title?: string
  image?: string
}

export type PhotoModel = Model<IPhoto, Record<string, unknown>>
