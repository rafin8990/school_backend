export type INewsEventsFilter = {
  searchTerm: string
  status?: string
}

export const NewsEventsSearchableFields = ['status']
export const NewsEventsFilterableFields = ['status']
