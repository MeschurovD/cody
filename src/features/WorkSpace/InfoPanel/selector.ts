import { createSelector } from "reselect";
import { RootState } from "../../../reducer/store";

const getId = (_: any, id: String) => id

export const selector = createSelector(
  (state: RootState) => state.spaces.workSpaces,
  getId,
  (workSpaces, id) => {
    console.log('selector')
    const index = workSpaces.findIndex(item => item.id === id)
    return workSpaces[index].name
  }
)