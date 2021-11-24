
//<--------------------IMPORT-------------------------->
import React, { useState } from 'react';
import styles from './checkButton.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  onClickYesFunction: Function
  icon: string
  text: string
  className?: string
}


//<--------------------COMPONENT----------------------->
const CheckButton: React.FC<PropsType> = ({ children, onClickYesFunction, className, icon, text }) => {


//<--------------------DATA AND STATES----------------->
  const [blackout, setBlackout] = useState(false)

  const mainStyle = `${styles.button} ${className}`
  const checkStyle = blackout ? styles.check_active : styles.check_disable
  const blackoutStyle = blackout ? styles.blackout : ''
  const yesStyle = `${icon} ${styles.yes}`


//<--------------------HANDLERS------------------------>
  const onClickButton = () => {
    setBlackout(true)
  }

  const onClickNotButton = () => {
    setBlackout(!blackout)
  }

  const onClick1 = () => {
    setBlackout(false)
  }

  const onClickYes = () => {
    onClickYesFunction()
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <>
      <div onClick={onClickButton} className={mainStyle}>
        {children}
        <div className={checkStyle}>
          <span>Вы уверены</span>
          <div className={styles.confirmation}>
            <div className={styles.check_button} onClick={onClickYes}>
              <i className={yesStyle} ></i>
              <span>{text}</span>
            </div>
          </div>
        </div>
      </div>
      <div onClick={onClickNotButton} className={blackoutStyle}></div>
    </>
  );
};

export default CheckButton;