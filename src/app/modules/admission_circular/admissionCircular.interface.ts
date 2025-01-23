import { Model } from 'mongoose'

export type IAdmissionCircular = {
  title: string
  pdfUrl: string
}

export type AdmissionCircularModel = Model<
  IAdmissionCircular,
  Record<string, unknown>
>
