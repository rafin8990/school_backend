import { Model } from 'mongoose'

export type IAdmissionResult = {
  title: string
  pdfUrl: string
}

export type AdmissionResultModel = Model<
  IAdmissionResult,
  Record<string, unknown>
>
