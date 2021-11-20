
//<--------------------IMPORT-------------------------->
import React, { useState } from 'react';
import { getLoginAction, getRegistrationAction } from '../../../../Firebase/actions/authAction';
import { useTypeDispatch, useTypeSelector } from '../../../../hooks/redux';
import styles from './registrPanel.module.scss'


//<--------------------COMPONENT----------------------->
const RegistrPanel: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const isAuth = useTypeSelector(state => state.auth.isAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


//<--------------------HANDLERS------------------------>
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

  const onClickTest = () => {
    setEmail('test1@gmail.com')
    setPassword('test12345')
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.panel}>
      <span className={styles.title}>Вход</span>
      <input type='email' placeholder='email' value={email} onChange={onChangeEmail} className={styles.input} />
      <input type='password' placeholder='password' value={password} onChange={onChangePassword} className={styles.input} />
      <div onClick={onClickTest}>Test</div>
      <button className={styles.login_button} onClick={onClickLogin} >Login</button>
      <span>ИЛИ</span>
      <button className={styles.registr_button} onClick={onClickRegistration} >registration</button>
      
    </div>
  );
};

export default RegistrPanel;