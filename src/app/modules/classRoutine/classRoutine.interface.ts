import { Model } from 'mongoose'

export type IClassRoutine = {
  className: string
  section: string
  day: string
  startTime: string
  endTime: string
  subject: string
  teacherName: string
}

export type ClassRoutineModel = Model<IClassRoutine, Record<string, unknown>>
