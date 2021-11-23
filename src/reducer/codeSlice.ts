import { createSlice } from "@reduxjs/toolkit";
import { CodePanelType, InitialStateType, PanelType } from "./types/codeTypes";
import _uniqueId from 'lodash/uniqueId'
import { addSpace } from "./spacesSlice";

const initialState: InitialStateType = {
  id: 0,
  loading: true,
  workSpace: []
}

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    loadSpace(state, action) {
      state.id = action.payload.id
      state.workSpace = action.payload.workSpace
      state.loading = false
    },
    updateLoading(state) {
      state.loading = true
      state.workSpace = []
    },
    newSpace(state, action) {
      state.id = action.payload.id
      state.workSpace = [{
        id: _uniqueId(),
        type: PanelType.CODE,
        content: ''
      }]
    },
    addCodePanel(state, action) {
      state.workSpace.push({
        id: action.payload.id,
        type: PanelType.CODE,
        content: ''
      })

    },
    addIframe(state, action) {
      state.workSpace.push({
        id: action.payload.id,
        type: PanelType.IFRAME,
        content: ''
      })
    },
    addText(state, action) {
      state.workSpace.push({
        id: action.payload.id,
        type: PanelType.TEXT,
        content: ''
      })
    },
    addItem(state, action) {
      if (action.payload.afterId && action.payload.afterId !== 0) {
        const index = state.workSpace.findIndex(item => item.id === action.payload.afterId)
        state.workSpace.splice(index, 0, {
          id: action.payload.id,
          type: action.payload.type,
          content: ''
        })
      } else {
        state.workSpace.push({
          id: action.payload.id,
          type: action.payload.type,
          content: ''
        })
      }
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
    updateContent(state, action) {
      const index = state.workSpace.findIndex(item => item.id === action.payload.id)
      //@ts-ignore
      state.workSpace[index].content = action.payload.content
    },
    clearWorkSpace(state) {
      state = {
        id: 0,
        loading: true,
        workSpace: []
      }
    }
  },
  // extraReducers: (builder) => {
  //   builder
  //   .addCase(addSpace, (state, action: any) => {
  //     state.id = action.payload.id
  //     state.workSpace = [{
  //       id: _uniqueId(),
  //       type: 'code',
  //       content: ''
  //     }]
  //   })
  // }
})

export const {
  loadSpace,
  updateLoading,
  addCodePanel,
  addIframe,
  addText,
  addItem,
  updateContent,
  moveUp,
  moveDown,
  deleteItem,
  clearWorkSpace
} = codeSlice.actions

export default codeSlice.reducer