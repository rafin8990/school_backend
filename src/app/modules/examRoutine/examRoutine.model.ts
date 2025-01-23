import { model, Schema } from 'mongoose'
import { ExamRoutineModel, IExamRoutine } from './examRoutine.interface'

const examRoutineSchema = new Schema<IExamRoutine>(
  {
    examName: { type: String, required: true },
    className: { type: String, required: true },
    subject: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const ExamRoutine = model<IExamRoutine, ExamRoutineModel>(
  'ExamRoutine',
  examRoutineSchema
)
