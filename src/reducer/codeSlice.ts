import { createSlice } from "@reduxjs/toolkit";
import { InitialStateType } from "./types/codeTypes";

const initialState: InitialStateType = {
  workSpace: [
    {
      type: 'code'
    }
  ]
}

const codeSlice = createSlice({
  name: 'code',
  initialState,
  reducers: {
    addCodePanel(state) {
      state.workSpace.push({ type: 'code' })

    },
    addIframe(state) {
      state.workSpace.push({type: 'iframe'})
    },
    deleteItem() { }
  }
})

export const { addCodePanel, addIframe } = codeSlice.actions
export default codeSlice.reducer