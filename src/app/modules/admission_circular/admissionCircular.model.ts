import { model, Schema } from 'mongoose'
import {
  AdmissionCircularModel,
  IAdmissionCircular,
} from './admissionCircular.interface'

const admissionCircularSchema = new Schema<IAdmissionCircular>(
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

export const AdmissionCircular = model<
  IAdmissionCircular,
  AdmissionCircularModel
>('AdmissionCircular', admissionCircularSchema)
