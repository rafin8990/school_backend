import { model, Schema } from 'mongoose'
import { INotice, noticeModel } from './notice.interface'

const NoticeSchema = new Schema<INotice>(
  {
    title: {
      type: String,
    },
    pdfUrl: {
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

export const Notice = model<INotice, noticeModel>('Notice', NoticeSchema)
