export type ITeacherFilter = {
  searchTerm: string
  status?: string
}

export const TeacherSearchableFields = ['status']
export const TeacherFilterableFields = ['status']
