import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth'
import { addLogin, setError } from '../../reducer/authSlice'
import { auth } from '../firebase'
import { getWorkSpacesAction, setWorkSpacesAction } from './firestoreAction'


interface GetAuthType {
  (
    email: string,
    password: string,
    dispatch: Function
  ): void
}

export const getRegistrationAction: GetAuthType = async (email, password, dispatch) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    //@ts-ignore
    const data = {email: user.email, id: user.uid, token: user.accessToken}
    setWorkSpacesAction([], user.uid)
    sessionStorage.setItem('user', JSON.stringify(data))
    dispatch(addLogin(data))
  } catch (error) {
     //@ts-ignore
     const errorCode = error.code
     dispatch(setError({error: errorCode}))
  }
}

export const getLoginAction: GetAuthType = async (email, password, dispatch) => {
  try {
    const { user } = await signInWithEmailAndPassword (auth, email, password)
    //@ts-ignore
    const data = {email: user.email, id: user.uid, token: user.accessToken, isLogin: true}
    sessionStorage.setItem('user', JSON.stringify(data))
    dispatch(addLogin(data))
  } catch (error) {
    //@ts-ignore
    const errorCode = error.code
    dispatch(setError({error: errorCode}))
  }
}