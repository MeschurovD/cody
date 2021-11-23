import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore"; 
import { changeLogin } from "../../reducer/authSlice";
import { loadSpace } from "../../reducer/codeSlice";
import { allSpaces } from "../../reducer/spacesSlice";
import { CodePanelType } from "../../reducer/types/codeTypes";
import { SpaceType } from "../../reducer/types/spacesTypes";
import { db } from "../firebase";

interface SetWorkSpacesType {
  (
    workSpaces: SpaceType[],
    id: string
  ): void
}
interface GetWorkSpacesType {
  (
    id: string,
    dispatch: Function
  ): void
}

interface SetWorkSpace {
  (
    id: string,
  ): void
}

interface GetWorkSpace {
  (
    id: string,
    dispatch: Function
  ): void
}

interface UpdateWorkSpace {
  (
    id: string,
    workSpace: CodePanelType[]
  ): void
}

const userWorkSpaces = 'userworkspaces'
const userWorkSpace = 'userworkspace'

export const setWorkSpacesAction: SetWorkSpacesType = async (workSpaces, id) => {
  const docRef = doc(db, userWorkSpaces, id)
  await setDoc(docRef, {workSpaces})
}

export const getWorkSpacesAction: GetWorkSpacesType = async (id, dispatch) => {
  const docRef = doc(db, userWorkSpaces, id)
  try {
    const workSpaces = await getDoc(docRef)
    //console.log(workSpaces.data())
    const data = workSpaces.data()
    dispatch(allSpaces({workSpaces: data}))
    //dispatch(changeLogin())
  } catch (error) {
    console.log(error)
  }
}

export const setWorkSpace: SetWorkSpace = async (id) => {
  const workSpace = [
    {
      id: Date.now(),
      type: 'code',
      content: ''
    }
  ]
  const docRef = doc(db, userWorkSpace, id)
  await setDoc(docRef, {id, workSpace})
}

export const getWorkSpace: GetWorkSpace = async (id, dispatch) => {
  const docRef = doc(db, userWorkSpace, id)
  try {
    const workSpace = await getDoc(docRef)
    const data = workSpace.data()
    dispatch(loadSpace(data))
  } catch (error) {
    console.log(error)
  }
}

export const updateWorkSpace: UpdateWorkSpace = async (id, workSpace) => {
  console.log(workSpace)
  const docRef = doc(db, userWorkSpace, id)
  await updateDoc(docRef, {
    workSpace
  })
}

export const deleteWorkSpace = async(id: string) => {
  const docRef = doc(db, userWorkSpace, id)
  await deleteDoc(docRef)
}