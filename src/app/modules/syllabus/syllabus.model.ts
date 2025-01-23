import { model, Schema } from 'mongoose'
import { ISyllabus, syllabusModel } from './syllabus.interface'

const syllabusSchema = new Schema<ISyllabus>(
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

export const Syllabus = model<ISyllabus, syllabusModel>(
  'Syllabus',
  syllabusSchema
)
