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
const example = 'example'
const idExample = '1'

//////////////////////////////////
//WORK SPACES

export const setWorkSpacesAction: SetWorkSpacesType = async (workSpaces, id) => {
  console.log('setWorkSpacesAction')
  const docRef = doc(db, userWorkSpaces, id)
  const validWorkSpaces = workSpaces.filter(item => item.id !== 'example')
  await setDoc(docRef, {workSpaces: validWorkSpaces})
}

export const getWorkSpacesAction: GetWorkSpacesType = async (id, dispatch) => {
  console.log('getWorkSpacesAction')
  const docRef = doc(db, userWorkSpaces, id)
  try {
    const workSpaces = await getDoc(docRef)
    const data = workSpaces.data()
    dispatch(allSpaces({workSpaces: data}))
  } catch (error) {
    console.log(error)
  }
}


//////////////////////////////////
//WORK SPACE

export const setWorkSpace: SetWorkSpace = async (id) => {
  console.log('setWorkSpace')
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
  console.log('getWorkSpace')
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
  console.log('updateWorkSpace')
  const docRef = doc(db, userWorkSpace, id)
  await updateDoc(docRef, {
    workSpace
  })
}

export const deleteWorkSpace = async(id: string) => {
  console.log('deleteWorkSpace')
  const docRef = doc(db, userWorkSpace, id)
  await deleteDoc(docRef)
}

//////////////////////////////////
//EXAMPLE

export const setExample = async (workSpace: any) => {
  console.log('Сохранение примера')
  const id = idExample
  const docRef = doc(db, 'example', id)
  await setDoc(docRef, {id, workSpace})
}

export const getExample = async (dispatch: any) => {
  console.log('Получение примера')
  const id = idExample
  const docRef = doc(db, example, id)
  try {
    const workSpace = await getDoc(docRef)
    const data = workSpace.data()
    dispatch(loadSpace(data))
  } catch (error) {
    console.log(error)
  }
}