import { model, Schema } from 'mongoose'
import { INewsEvents, NewsEventsModel } from './newsEvents.interface'

const newsEventsSchema = new Schema<INewsEvents>(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const NewsEvents = model<INewsEvents, NewsEventsModel>(
  'NewsEvents',
  newsEventsSchema
)
