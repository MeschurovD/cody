import { CodePanelType } from "../../../../reducer/types/codeTypes"

export const getCumulativeCode = (workSpace: CodePanelType[], item: CodePanelType) => {

  const reactImport = `
    import React from 'react'
    import ReactDOM from 'react-dom'
  `
  const show = `
    var show = (value) => {
      const root = document.querySelector('#root')
      if(typeof value === 'object') {
        if (value.$$typeof && value.props) {
          ReactDOM.render(value, root)
        } else {
          root.innerHTML = JSON.stringify(value)
        }
      } else {
        root.innerHTML = value
      }
    }
  `
  const noShow = `var show = () => {}`

  const cumulativeCode = []
  cumulativeCode.push(reactImport)

  for (let c of workSpace) {

    if (c.type === 'code') {
      if (c.id === item.id || item.type === 'iframe') {
        cumulativeCode.push(show)
      } else {
        cumulativeCode.push(noShow)
      }
      cumulativeCode.push(c.content)
    }
    if (c.id === item.id) {
      break
    }
  }
  return cumulativeCode
}