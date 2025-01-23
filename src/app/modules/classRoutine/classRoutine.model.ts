import { model, Schema } from 'mongoose'
import { ClassRoutineModel, IClassRoutine } from './classRoutine.interface'

const classRoutineSchema = new Schema<IClassRoutine>(
  {
    className: { type: String, required: true },
    section: { type: String, required: true },
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    subject: { type: String, required: true },
    teacherName: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const ClassRoutine = model<IClassRoutine, ClassRoutineModel>(
  'ClassRoutine',
  classRoutineSchema
)
