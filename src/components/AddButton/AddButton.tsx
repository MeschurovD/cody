
//<--------------------IMPORT-------------------------->
import React, { MouseEventHandler } from 'react';
import styles from './addButton.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  icon: string
  onClickButton: MouseEventHandler<HTMLDivElement>
}


//<--------------------COMPONENT----------------------->
const AddButton: React.FC<PropsType> = ({ icon, onClickButton, children }) => {


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.button} onClick={onClickButton}>
        <i className={icon}></i>
      <div className={styles.title}>
        {children}
      </div>
    </div>
  );
};

export default AddButton;