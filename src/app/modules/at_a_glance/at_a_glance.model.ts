import { model, Schema } from 'mongoose'
import { atAGlanceModel, IAtAGlance } from './at_a_glance.interface'

const AtAGlanceSchema = new Schema<IAtAGlance>(
  {
    image: {
      type: String,
    },
    title: {
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

export const AtAGlance = model<IAtAGlance, atAGlanceModel>('AtAGlance', AtAGlanceSchema)
