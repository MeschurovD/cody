interface CodePanelType {
  type: string
}

interface IframeType {
  type: string
}

export interface InitialStateType {
  workSpace: (CodePanelType | IframeType)[]
}