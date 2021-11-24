
//<--------------------IMPORT-------------------------->
import React, { useEffect, useState } from 'react';
import { getLoginAction, getRegistrationAction } from '../../../../Firebase/actions/authAction';
import { useTypeDispatch, useTypeSelector } from '../../../../hooks/redux';
import { ErrorCode } from '../../../../reducer/types/authTypes';
import styles from './registrPanel.module.scss'


//<--------------------COMPONENT----------------------->
const RegistrPanel: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const error = useTypeSelector(state => state.auth.errorCode)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
  const [errorPassword, setErrorPassword] = useState('')

  const emailStyle = `${styles.input} ${errorEmail ? styles.error_b : ''}`
  const passwordStyle = `${styles.input} ${errorPassword ? styles.error_b : ''}`


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    if (error === ErrorCode.INVALID_EMAIL) setErrorEmail('Неверный Email')
    if (error === ErrorCode.WRONG_PASSWORD) setErrorPassword('Неверный пароль')
  }, [error])


//<--------------------HANDLERS------------------------>
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorEmail('')
    setEmail(event.target.value)
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setErrorPassword('')
    setPassword(event.target.value)
  }

  const onClickRegistration = () => {
    if (email && password) {
      getRegistrationAction(email, password, dispatch)
    } else {
      if (!email) setErrorEmail('Введите email')
      if (!password) setErrorPassword('Введите пароль')
    }
  }

  const onClickLogin = () => {
    if (email && password) {
      getLoginAction(email, password, dispatch)
    } else {
      if (!email) setErrorEmail('Введите email')
      if (!password) setErrorPassword('Введите пароль')
    }
  }

  const onClickTest = () => {
    setEmail('test1@gmail.com')
    setPassword('test12345')
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <>
      <div className={styles.panel}>
        <span className={styles.title}>Вход</span>
        <div>
          <input type='email' placeholder='email' value={email} onChange={onChangeEmail} className={emailStyle} />
          <div className={styles.error_t}>{errorEmail}</div>
        </div>
        <div>
          <input type='password' placeholder='password' value={password} onChange={onChangePassword} className={passwordStyle} />
          <div className={styles.error_t}>{errorPassword}</div>
        </div>
        <button className={styles.login_button} onClick={onClickLogin} >Войти</button>
        <span>ИЛИ</span>
        <button className={styles.registr_button} onClick={onClickRegistration} >Зарегистрироваться</button>
      </div>
      <div className={styles.test} onClick={onClickTest}>
        <span>
          Использовать тестовый аккаунт
        </span>
      </div>
    </>
  );
};

export default RegistrPanel;