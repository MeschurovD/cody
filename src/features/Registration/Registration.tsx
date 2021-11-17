import React from 'react'
import { Redirect } from 'react-router';
import { useTypeSelector } from '../../hooks/redux';
import RegistrPanel from './components/RegistrPanel/RegistrPanel';
import styles from './registration.module.scss'

const Registration: React.FC = () => {

  const isAuth = useTypeSelector(state => state.auth.isAuth)

  return (
    <>
      {isAuth && <Redirect to='/main' />}
      <div className={styles.reg}>
        <RegistrPanel />
      </div>
    </>
  );
};

export default Registration;