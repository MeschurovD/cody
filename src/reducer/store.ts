import { configureStore, combineReducers } from "@reduxjs/toolkit"
import codeSlice from "./codeSlice"


const rootReducer = combineReducers({
  code: codeSlice,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDafaultMiddleware) => getDafaultMiddleware().concat()
  })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
