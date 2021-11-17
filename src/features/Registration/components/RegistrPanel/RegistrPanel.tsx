import React, { useState } from 'react';
import { getLoginAction, getRegistrationAction } from '../../../../Firebase/actions/authAction';
import { useTypeDispatch, useTypeSelector } from '../../../../hooks/redux';

const RegistrPanel: React.FC = () => {

  const dispatch = useTypeDispatch()
  const isAuth = useTypeSelector(state => state.auth.isAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const onClickRegistration = () => {
    if (email && password) {
      getRegistrationAction(email, password, dispatch)
    }
  }

  const onClickLogin = () => {
    if (email && password) {
      getLoginAction(email, password, dispatch)
    }
  }

  return (
    <div>
      <input type='email' placeholder='email' value={email} onChange={onChangeEmail} />
      <input type='password' placeholder='password' value={password} onChange={onChangePassword} />
      <button onClick={onClickRegistration} >registration</button>
      <button onClick={onClickLogin} >Login</button>
      <div>
        {isAuth ? 'ok' : 'not ok'}
      </div>
    </div>
  );
};

export default RegistrPanel;