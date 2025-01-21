import { model, Schema } from 'mongoose'
import { IPhoto, PhotoModel } from './photo.interface'

const PhotoSchema = new Schema<IPhoto>(
  {
    title: {
      type: String,
    },
    image: {
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

export const Photo = model<IPhoto, PhotoModel>('Photo', PhotoSchema)
