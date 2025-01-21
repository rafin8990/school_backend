import { model, Schema } from 'mongoose'
import {
  ChairmanMessageModel,
  IChairmanMessage,
} from './chairmanMessage.interface'

const ChairmanMessageSchema = new Schema<IChairmanMessage>(
  {
    message: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
    },
    facebookURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
    youtubeURL: {
      type: String,
    },
    tweeterURL: {
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

export const ChairmanMessage = model<IChairmanMessage, ChairmanMessageModel>(
  'ChairmanMessage',
  ChairmanMessageSchema
)
