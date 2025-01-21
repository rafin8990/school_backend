import { Model } from 'mongoose'

export type IAchievements = {
  image: string
  title: string
  description: string
}

export type AchievementsModel = Model<IAchievements, Record<string, unknown>>
