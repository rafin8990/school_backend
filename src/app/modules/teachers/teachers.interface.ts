import { Model } from 'mongoose'

export type ITeacher = {
  image: string
  name: string
  department: string
  subject: string
  email: string
  phone: string
  education: string
  experience: string
  designation: string
  address: string
}

export type TeacherModel = Model<ITeacher, Record<string, unknown>>
