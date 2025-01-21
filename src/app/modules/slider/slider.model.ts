import { model, Schema } from 'mongoose'
import { ISlider, sliderModel } from './slider.interface'

const sliderSchema = new Schema<ISlider>(
  {
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: 'active',
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Slider = model<ISlider, sliderModel>('Slider', sliderSchema)
