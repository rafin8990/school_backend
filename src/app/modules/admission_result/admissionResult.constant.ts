export type IAdmissionResultFilter = {
  searchTerm: string
  status?: string
}

export const AdmissionResultSearchableFields = ['status']
export const AdmissionResultFilterableFields = ['status']
