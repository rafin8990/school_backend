import { Model } from 'mongoose'

export type INewsEvents = {
  image: string
  title: string
  description: string
}

export type NewsEventsModel = Model<INewsEvents, Record<string, unknown>>
