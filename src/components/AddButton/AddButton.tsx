import React, { MouseEventHandler } from 'react';

import styles from './addButton.module.scss'

interface PropsType {
  icon: string
  onClickButton: MouseEventHandler<HTMLDivElement>
}

const AddButton: React.FC<PropsType> = ({ icon, onClickButton, children }) => {
  return (
    <div className={styles.button} onClick={onClickButton}>
      <div className={styles.icon}>
        <i className={icon}></i>
      </div>
      <div className={styles.title}>
      {children}
      </div>
        {/* <span>{children}</span> */}
    </div>
  );
};

export default AddButton;