export interface File {
  id: number
  name: string
  folderPath: string
  folder: number | null
  provider: string
  parent: string
  provider_metadata: {
    id: string
  }
}
