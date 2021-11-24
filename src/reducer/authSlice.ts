import { createSlice } from '@reduxjs/toolkit';
import { allSpaces } from './spacesSlice';
import { AuthType, ErrorCode } from './types/authTypes';

const initialState: AuthType = {
  email: '',
  id: '',
  token: '',
  isAuth: false,
  isLogin: true,
  errorCode: ErrorCode.NOT_ERROR
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
      state.isLogin = true
      state.errorCode = ErrorCode.NOT_ERROR
    },
    setError(state, action) {
      state.errorCode = action.payload.error
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

export const { 
  addLogin, 
  removeLogin, 
  changeLogin, 
  setError 
} = authSlice.actions

export default authSlice.reducer