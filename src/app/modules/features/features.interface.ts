import { Model } from 'mongoose'

export type IFeatures = {
  image: string
  description: string
}

export type featuresModel = Model<IFeatures, Record<string, unknown>>
