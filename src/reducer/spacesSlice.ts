import { createSlice } from '@reduxjs/toolkit';
import { initialStateType } from './types/spacesTypes';

const initialState: initialStateType = {
  workSpaces: []
}


const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    addSpace(state, action) {
      state.workSpaces.push({
        id: action.payload.id,
        name: action.payload.name,
        codeCount: 1
      })
    },
    changeName(state, action) {
      const index = state.workSpaces.findIndex(item => item.id === action.payload.id)
      state.workSpaces[index].name = action.payload.name
    },
    removeSpace(state, action) {
      const index = state.workSpaces.findIndex(item => item.id === action.payload.id)
      state.workSpaces.splice(index, 1)
    }
  }
})

export const { addSpace, removeSpace,changeName } = spacesSlice.actions
export default spacesSlice.reducer