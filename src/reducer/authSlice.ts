import { createSlice } from '@reduxjs/toolkit';
import { allSpaces } from './spacesSlice';
import { AuthType } from './types/authTypes';

const initialState: AuthType = {
  email: '',
  id: '',
  token: '',
  isAuth: false,
  isLogin: true
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addLogin(state, action) {
      state.email = action.payload.email
      state.id = action.payload.id
      state.token = action.payload.token
      state.isAuth = true
      action.payload.isLogin
        ? state.isLogin = true
        : state.isLogin = true
    },
    removeLogin(state) {
      state.email = ''
      state.id = ''
      state.token = ''
      state.isAuth = false
    },
    changeLogin(state) {
      state.isLogin = false
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(allSpaces, (state) => {
      state.isLogin = false
    })
  }
})

export const { addLogin, removeLogin, changeLogin } = authSlice.actions
export default authSlice.reducer