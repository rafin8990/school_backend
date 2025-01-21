import { model, Schema } from 'mongoose'
import { IVideo, VideoModel } from './video.interface'

const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    thumbnail: {
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

export const Video = model<IVideo, VideoModel>('Video', VideoSchema)
