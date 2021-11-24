
//<--------------------IMPORT-------------------------->
import React from 'react';
import { useHistory } from 'react-router-dom'
import { useTypeDispatch } from '../../hooks/redux';
import { removeLogin } from '../../reducer/authSlice';
import { clearWorkSpace, updateLoading } from '../../reducer/codeSlice';
import { changeThemeAction, cleaningWorkSpaces } from '../../reducer/spacesSlice';
import CheckButton from '../CheckButton/CheckButton';
import styles from './header.module.scss'


//<--------------------COMPONENT----------------------->
const Header: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  let history = useHistory()
  const dispatch = useTypeDispatch()


//<--------------------HANDLERS------------------------>
  const redirectToMain = () => {
    history.push('/main')
    dispatch(updateLoading())
  }

  const changeTheme = () => {
    document.body.classList.toggle(styles.dark_theme)
    dispatch(changeThemeAction())

  }

  const onClickLogOut = () => {
    dispatch(removeLogin())
    sessionStorage.removeItem('user')
    setTimeout(() => {
      dispatch(cleaningWorkSpaces())
      dispatch(clearWorkSpace())
    }, 1000)
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo} onClick={redirectToMain}>
          <i className='bx bxs-copyright'></i>
          <span>ody</span>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.theme} onClick={changeTheme}>
          <i className='bx bx-bulb' ></i>
        </div>
        <CheckButton onClickYesFunction={onClickLogOut} text='Выйти' icon='bx bx-log-out' >
          <div className={styles.out}>
            <i className='bx bx-log-out'></i>
            <span>Log out</span>
          </div>
        </CheckButton>
      </div>
    </div>
  );
};

export default Header;