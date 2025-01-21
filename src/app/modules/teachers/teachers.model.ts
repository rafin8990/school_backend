import { model, Schema } from 'mongoose'
import { ITeacher, TeacherModel } from './teachers.interface'

const teacherSchema = new Schema<ITeacher>(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    designation: {
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

export const Teacher = model<ITeacher, TeacherModel>('Teacher', teacherSchema)
