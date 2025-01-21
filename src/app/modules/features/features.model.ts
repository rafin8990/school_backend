import { model, Schema } from 'mongoose'
import { featuresModel, IFeatures } from './features.interface'

const HistorySchema = new Schema<IFeatures>(
  {
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

export const Features = model<IFeatures, featuresModel>(
  'Feature',
  HistorySchema
)
