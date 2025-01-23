import { model, Schema } from 'mongoose'
import {
  AdmissionResultModel,
  IAdmissionResult,
} from './admissionResult.interface'

const admissionResultSchema = new Schema<IAdmissionResult>(
  {
    title: {
      type: String,
      required: true,
    },
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const AdmissionResult = model<IAdmissionResult, AdmissionResultModel>(
  'AdmissionResult',
  admissionResultSchema
)
