import { Model } from 'mongoose'

export type ISyllabus = {
  title: string
  pdfUrl: string
}

export type syllabusModel = Model<ISyllabus, Record<string, unknown>>
