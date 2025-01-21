import { Model } from 'mongoose'

export type ISlider = {
  image: string
  status: 'active' | 'inactive'
}

export type sliderModel = Model<ISlider, Record<string, unknown>>
