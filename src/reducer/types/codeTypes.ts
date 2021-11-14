export interface CodePanelType {
  id: string
  type: string
  code: string | undefined
}

interface IframeType {
  id: string
  type: string
}

export interface InitialStateType {
  workSpace: CodePanelType[]
}