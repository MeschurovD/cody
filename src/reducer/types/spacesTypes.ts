export interface SpaceType {
  id: number
  name: string
  codeCount: number
}

export interface initialStateType {
  themeDark: boolean
  workSpaces: SpaceType[]
}