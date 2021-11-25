
//<--------------------IMPORT-------------------------->
import React from 'react';
import { Redirect } from 'react-router';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import { addLogin } from '../../reducer/authSlice';


//Компонент обёртка для проверки, что пользователь аутентифицирован
//<--------------------COMPONENT----------------------->
const IsAuth: React.FC = ({ children }) => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()

  const isAuth = useTypeSelector(state => state.auth.isAuth)

  //Проверка наличия данных в SessionStorage
  if (!isAuth) {
    const sessionUser = sessionStorage.getItem('user')
    if (sessionUser) {
      const { email, id, token } = JSON.parse(sessionUser)
      dispatch(addLogin({ email, id, token }))
    }
  }


//<--------------------JSX COMPONENT------------------->
  return isAuth
    ? (<>{children}</>)
    : (<><Redirect to='/register' /></>)
}

export default IsAuth;