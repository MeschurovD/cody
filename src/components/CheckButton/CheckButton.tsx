import React, { useState } from 'react';
import styles from './checkButton.module.scss'

interface PropsType {
  onClickYesFunction: Function
  icon: string
  text: string
  className?: string

}

const CheckButton: React.FC<PropsType> = ({ children, onClickYesFunction, className, icon, text }) => {

  const [blackout, setBlackout] = useState(false)

  const mainStyle = `${styles.button} ${className}`
  const checkStyle = blackout ? styles.check_active : styles.check_disable
  const blackoutStyle = blackout ? styles.blackout : ''
  const yesStyle = `${icon} ${styles.yes}`

  console.log(blackout)

  const onClickButton = () => {
    setBlackout(true)
  }

  const onClickNotButton = () => {
    console.log('no')
    setBlackout(!blackout)
  }

  const onClick1 = () => {
    setBlackout(false)
  }

  const onClickYes = () => {
    onClickYesFunction()
  }

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
            {/* <div onClick={onClickNotButton} className={styles.check_button} >
              <i className={noStyle} ></i>
              <span>Нет</span>
            </div> */}
          </div>
        </div>
      </div>

      <div onClick={onClickNotButton} className={blackoutStyle}></div>
    </>
  );
};

export default CheckButton;