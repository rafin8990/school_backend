import { model, Schema } from 'mongoose'
import {
  IInstituteMotto,
  instituteMottoModel,
} from './InstituteMotto.interface'

const instituteMottoSchema = new Schema<IInstituteMotto>(
  {
    image: {
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

export const InstituteMotto = model<IInstituteMotto, instituteMottoModel>(
  'InstituteMotto',
  instituteMottoSchema
)
