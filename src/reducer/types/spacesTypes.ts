export interface SpaceType {
  id: string
  name: string
  codeCount: number
}

export interface initialStateType {
  themeDark: boolean
  workSpaces: SpaceType[]
}