
//<--------------------IMPORT-------------------------->
import React, { useEffect, useState } from 'react';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import { setError } from '../../reducer/authSlice';
import { ErrorCode } from '../../reducer/types/authTypes';
import styles from './errorBox.module.scss'


//<--------------------COMPONENT----------------------->
const ErrorBox: React.FC = () => {

  const dispatch = useTypeDispatch()
  const errorCode = useTypeSelector(state => state.auth.errorCode)

  const [first, setFirst] = useState(true)

  const [errorMessage, setErrorMessage] = useState('')
  const errorBoxStyle = first
    ? `${styles.error_box} ${styles.first}`
    : errorMessage
      ? `${styles.error_box} ${styles.active}`
      : `${styles.error_box} ${styles.disable}`

  useEffect(() => {
    if (errorCode === ErrorCode.NOT_ERROR) {
      setErrorMessage('')
    }
    if (errorCode === ErrorCode.EMAIL_ALREADY_IN_USE) {
      setFirst(false)
      setErrorMessage('Такой пользователь уже существует')
    }
    if (errorCode === ErrorCode.USER_NOT_FOUND) {
      setFirst(false)
      setErrorMessage('Такого пользователя не существует')
    }
   
    setTimeout(() => {
      dispatch(setError({ error: '' }))
    }, 10000)
  }, [errorCode])


  return (
    <div className={errorBoxStyle}>
      <div className={styles.title}>
        Ошибка
      </div>
      <span>
        {errorMessage}
      </span>
    </div>
  );
};

export default ErrorBox;