import { Model } from 'mongoose'

export type IHistory = {
  title?: string
  image?: string
  description?: string
}

export type historyModel = Model<IHistory, Record<string, unknown>>
