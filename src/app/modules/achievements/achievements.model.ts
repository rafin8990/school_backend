import { model, Schema } from 'mongoose'
import { AchievementsModel, IAchievements } from './achievements.interface'

const achievementsSchema = new Schema<IAchievements>(
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

export const Achievements = model<IAchievements, AchievementsModel>(
  'Achievements',
  achievementsSchema
)
