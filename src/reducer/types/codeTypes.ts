export enum PanelType {
  CODE = 'code',
  IFRAME = 'iframe',
  TEXT = 'text'
}

export interface CodePanelType {
  id: string
  type: PanelType
  content: string | undefined
}

interface IframeType {
  id: string
  type: PanelType
}

export interface InitialStateType {
  id: number
  loading: boolean
  workSpace: CodePanelType[]
}