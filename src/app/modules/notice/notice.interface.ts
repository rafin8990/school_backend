import { Model } from 'mongoose'

export type INotice = {
  title: string
  pdfUrl: string
}

export type noticeModel = Model<INotice, Record<string, unknown>>
