import { createSlice } from '@reduxjs/toolkit';
import { initialStateType } from './types/spacesTypes';


const initialState: initialStateType = {
  themeDark: false,
  workSpaces: []
}


const spacesSlice = createSlice({
  name: 'spaces',
  initialState,
  reducers: {
    allSpaces(state, action) {
      state.workSpaces = action.payload.workSpaces.workSpaces
      state.workSpaces.push({
        id: 'example',
        name: 'Пример',
        codeCount: 1
      })
    },
    addSpace(state, action) {
      state.workSpaces = [
        {
          id: action.payload.id,
          name: action.payload.name,
          codeCount: 1
        },
        ...state.workSpaces
      ]
    },
    changeName(state, action) {
      const index = state.workSpaces.findIndex(item => item.id === action.payload.id)
      state.workSpaces[index].name = action.payload.name
    },
    removeSpace(state, action) {
      const index = state.workSpaces.findIndex(item => item.id === action.payload.id)
      state.workSpaces.splice(index, 1)
    },
    cleaningWorkSpaces(state) {
      state.workSpaces = []
    },
    changeThemeAction(state) {
      state.themeDark = !state.themeDark
    }
  }
})

export const { addSpace,
  removeSpace,
  changeName,
  allSpaces,
  cleaningWorkSpaces,
  changeThemeAction
} = spacesSlice.actions

export default spacesSlice.reducer