import React from 'react';
import { Redirect } from 'react-router';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import { addLogin } from '../../reducer/authSlice';

const IsAuth: React.FC = ({ children }) => {

  const dispatch = useTypeDispatch()

  const isAuth = useTypeSelector(state => state.auth.isAuth)

  if (!isAuth) {
    const sessionUser = sessionStorage.getItem('user')
    if (sessionUser) {
      const { email, id, token } = JSON.parse(sessionUser)
      dispatch(addLogin({email, id, token}))
    }
  }

  return isAuth
    ? (<>
      {children}
    </>)
    : (<>
      <Redirect to='/register' />
    </>)

    ;
};

export default IsAuth;