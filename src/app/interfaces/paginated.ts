export interface Paginated {
  docs: any[],
  limit: number,
  page: number,
  pages: number,
  total: number,
  lastDocId?: string
}
