import { model, Schema } from 'mongoose'
import {
  IPrincipalMessage,
  PrincipalMessageModel,
} from './principalMessage.interface'

const principalMessageSchema = new Schema<IPrincipalMessage>(
  {
    message: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    facebookURL: {
      type: String,
    },
    instagramURL: {
      type: String,
    },
    tweeterURL: {
      type: String,
    },
    youtubeURL: {
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

export const PrincipalMessage = model<IPrincipalMessage, PrincipalMessageModel>(
  'PrincipalMessage',
  principalMessageSchema
)
