import { createSlice } from "@reduxjs/toolkit";
import { CodePanelType, InitialStateType } from "./types/codeTypes";
import _uniqueId from 'lodash/uniqueId'

const initialState: InitialStateType = {
  workSpace: [
    {
      id: _uniqueId(),
      type: 'code',
      code: ''
    }
  ]
}

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    addCodePanel(state, action) {
      state.workSpace.push({
        id: action.payload.id,
        type: 'code',
        code: ''
      })

    },
    addIframe(state, action) {
      state.workSpace.push({
        id: action.payload.id,
        type: 'iframe',
        code: undefined
      })
    },
    deleteItem(state, action) {
      const index: number = state.workSpace.findIndex(item => item.id === action.payload.id)
      state.workSpace.splice(index, 1)
    },
    moveUp(state, action) {
      const firstIndex: number = state.workSpace.findIndex(item => item.id === action.payload.id)
      const secondIndex = firstIndex - 1
     
      const mas = state.workSpace.map((item, index) => {
        if (index === firstIndex) {
          return state.workSpace[secondIndex]
        }
        if (index === secondIndex) {
          return state.workSpace[firstIndex]
        }
        return item
      })
     
      //@ts-ignore
      state.workSpace = mas
    },
    moveDown(state, action) {
      const firstIndex: number = state.workSpace.findIndex(item => item.id === action.payload.id)
      const secondIndex = firstIndex + 1
     
      const mas = state.workSpace.map((item, index) => {
        if (index === firstIndex) {
          return state.workSpace[secondIndex]
        }
        if (index === secondIndex) {
          return state.workSpace[firstIndex]
        }
        return item
      })
     
      //@ts-ignore
      state.workSpace = mas
    },
    updateCode(state, action) {
      const index = state.workSpace.findIndex(item => item.id === action.payload.id)
      //@ts-ignore
      state.workSpace[index].code = action.payload.code
    }
  }
})

export const {
  addCodePanel,
  addIframe,
  updateCode,
  moveUp,
  moveDown,
  deleteItem
} = codeSlice.actions

export default codeSlice.reducer