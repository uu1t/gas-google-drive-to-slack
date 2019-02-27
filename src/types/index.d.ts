export interface Change {
  name: string
  url: string
  type: 'added' | 'updated'
  date: Date
}
