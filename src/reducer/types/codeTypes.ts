export interface CodePanelType {
  id: string
  type: string
  content: string | undefined
}

interface IframeType {
  id: string
  type: string
}

export interface InitialStateType {
  id: number
  loading: boolean
  workSpace: CodePanelType[]
}