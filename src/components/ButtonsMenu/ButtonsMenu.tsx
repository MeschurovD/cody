
//<--------------------IMPORT-------------------------->
import React from 'react';
import { useTypeDispatch } from '../../hooks/redux';
import { deleteItem, moveDown, moveUp } from '../../reducer/codeSlice';
import styles from './buttonMenu.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  id: string
  isRemove?: boolean
  isMoveUp?: boolean
  isMoveDown?: boolean
}


//<--------------------COMPONENT----------------------->
const ButtonsMenu: React.FC<PropsType> = ({ id, isRemove = false, isMoveUp = false, isMoveDown = false }) => {

  
//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()


//<--------------------HANDLERS------------------------>
  const onClickRemove = () => {
    dispatch(deleteItem({ id }))
  }

  const onClickMoveUp = () => {
    dispatch(moveUp({ id }))
  }

  const onClickMoveDown = () => {
    dispatch(moveDown({ id }))
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.button_menu}>
      {isMoveUp && <div onClick={onClickMoveUp} >
        <i className='bx bx-up-arrow-alt' ></i>
      </div>}
      {isMoveDown && <div onClick={onClickMoveDown}>
        <i className='bx bx-down-arrow-alt' ></i>
      </div>}
      {isRemove && <div onClick={onClickRemove} >
        <i className='bx bx-x' ></i>
      </div>}
    </div>
  );
};

export default ButtonsMenu;