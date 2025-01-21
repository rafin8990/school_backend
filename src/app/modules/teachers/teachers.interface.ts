import { Model } from 'mongoose'

export type ITeacher = {
  image: string
  name: string
  designation: string
}

export type TeacherModel = Model<ITeacher, Record<string, unknown>>
