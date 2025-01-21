import { model, Schema } from 'mongoose'
import { historyModel, IHistory } from './history.interface'

const HistorySchema = new Schema<IHistory>(
  {
    title: {
      type: String,
    },
    image: {
      type: String,
    },

    description: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const History = model<IHistory, historyModel>('History', HistorySchema)
