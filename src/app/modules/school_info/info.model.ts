import { model, Schema } from 'mongoose'
import { IInfo, infoModel } from './info.interface'

const infoSchema = new Schema<IInfo>(
  {
    logo: {
      type: String,
    },
    school_name: {
      type: String,
    },
    address: {
      type: String,
    },
    eiin: {
      type: Number,
    },
    school_code: {
      type: Number,
    },
    email: {
      type: String,
    },
    mobile_no: {
      type: String,
    },
    website: {
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

export const Info = model<IInfo, infoModel>('Info', infoSchema)
