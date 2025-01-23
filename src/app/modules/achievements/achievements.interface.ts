import { Model } from 'mongoose'

export type IAchievements = {
  year: string
  category: string
  title: string
  description: string
}

export type AchievementsModel = Model<IAchievements, Record<string, unknown>>
