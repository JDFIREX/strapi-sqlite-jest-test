export interface Folder {
  id: number
  name: string
  path: string
  folderId: string
  systemName: string
  pathId: string
  parent: {
    id: number
  }
}
