import React from 'react';
import { useHistory } from 'react-router-dom'
import { useTypeDispatch } from '../../hooks/redux';
import { removeLogin } from '../../reducer/authSlice';
import { clearWorkSpace, updateLoading } from '../../reducer/codeSlice';
import { cleaningWorkSpaces } from '../../reducer/spacesSlice';
import styles from './header.module.scss'

const Header: React.FC = () => {

  let history = useHistory()
  const dispatch = useTypeDispatch()

  const redirectToMain = () => {
    history.push('/main')
    dispatch(updateLoading())
  }

  const changeTheme = () => {
    document.body.classList.toggle(styles.dark_theme)
  }

  const onClickLogOut = () => {
    dispatch(removeLogin())
    sessionStorage.removeItem('user')
    setTimeout(() => {
      dispatch(cleaningWorkSpaces())
      dispatch(clearWorkSpace())
    }, 1000)
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <button onClick={redirectToMain}>menu</button>
      </div>
      <div className={styles.right}>
        <button onClick={changeTheme}>theme</button>
        <button onClick={onClickLogOut}>log out</button>
      </div>
    </div>
  );
};

export default Header;