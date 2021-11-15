import React from 'react';
import { useHistory } from 'react-router-dom'
import styles from './header.module.scss'

const Header: React.FC = () => {

  let history = useHistory()

  const redirectToMain = () => {
    history.push('/main')
  }

  const changeTheme = () => {
    document.body.classList.toggle(styles.dark_theme)
  }

  const onClickLogOut = () => {
    console.log('onClickLogOut')
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