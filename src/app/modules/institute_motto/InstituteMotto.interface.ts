import { Model } from 'mongoose'

export type IInstituteMotto = {
  image: string
}

export type instituteMottoModel = Model<
  IInstituteMotto,
  Record<string, unknown>
>
