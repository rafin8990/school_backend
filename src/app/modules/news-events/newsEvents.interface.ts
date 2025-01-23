import { Model } from 'mongoose'

export type INewsEvents = {
  image: string
  title: string
  category: string
  description: string
}

export type NewsEventsModel = Model<INewsEvents, Record<string, unknown>>
