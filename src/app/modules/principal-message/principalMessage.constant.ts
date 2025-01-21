export type IPrincipalMessage = {
  message: string
  image: string
  name: string
  facebookURL?: string
  instagramURL?: string
  tweeterURL?: string
  youtubeURL?: string
}

export type IPrincipalMessageFilter = {
  searchTerm: string
  status?: string
}

export const PrincipalMessageSearchableFields = ['status']
export const PrincipalMessageFilterableFields = ['status']
