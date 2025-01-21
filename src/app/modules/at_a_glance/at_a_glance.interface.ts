import { Model } from "mongoose"

export type IAtAGlance = {
  image: string
  title: string
  description: string
}

export type atAGlanceModel = Model<IAtAGlance, Record<string, unknown>>
