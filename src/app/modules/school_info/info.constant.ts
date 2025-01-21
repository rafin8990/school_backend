export type IInfoFilter = {
  searchTerm: string
  school_name?: string
  address?: string
  website?: string
  mobile?: string
  email?: string
}

export const InfoSearchableFields = [
  'school_name',
  'address',
  'website',
  'mobile',
  'email',
]
export const InfoFilterableFields = [
  'school_name',
  'address',
  'website',
  'mobile',
  'email',
]
