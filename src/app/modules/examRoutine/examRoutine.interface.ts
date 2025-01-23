import { Model } from 'mongoose'

export type IExamRoutine = {
  examName: string
  className: string
  subject: string
  date: string
  startTime: string
  endTime: string
  venue: string
}

export type ExamRoutineModel = Model<IExamRoutine, Record<string, unknown>>
