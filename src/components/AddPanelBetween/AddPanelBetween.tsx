
//<--------------------IMPORT-------------------------->
import React, { useState } from 'react';
import { useTypeDispatch } from '../../hooks/redux';
import { addItem } from '../../reducer/codeSlice';
import { PanelType } from '../../reducer/types/codeTypes';
import styles from './addPanelBetween.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  id: string
}


//<--------------------COMPONENT----------------------->
const AddPanelBetween: React.FC<PropsType> = ({ id }) => {


  //<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const [active, setActive] = useState(false)
  const [first, setFirst] = useState(true)

  const wrapperStyle = first
    ? `${styles.wrapper} ${styles.first}`
    : active ? `${styles.wrapper} ${styles.active}` : `${styles.wrapper} ${styles.disable}`

  const blackoutStyle = active ? styles.blackout : ''
  const iconPlusStyle = active ? `${styles.icon_plus} bx bx-minus` : `${styles.icon_plus} bx bx-plus`


  //<--------------------HANDLERS------------------------>
  const onClickButton = () => {
    setActive(!active)
    setFirst(false)
  }

  const onClickAddCodePanel = () => {
    dispatch(addItem({ id: Date.now(), afterId: id, type: PanelType.CODE }))
  }

  const onClickAddTextPanel = () => {
    console.log('id - ' + id)
    dispatch(addItem({ id: Date.now(), afterId: id, type: PanelType.TEXT }))
  }

  const onClickAddWindowPanel = () => {
    dispatch(addItem({ id: Date.now(), afterId: id, type: PanelType.IFRAME }))
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.add_button}>
      <div className={wrapperStyle}>
        <i className={iconPlusStyle} onClick={onClickButton} ></i>
        <div className={styles.button_panel}>
          <i className='bx bx-code-alt' onClick={onClickAddCodePanel} ></i>
          <i className='bx bx-text' onClick={onClickAddTextPanel} ></i>
          <i className='bx bx-window' onClick={onClickAddWindowPanel} ></i>
        </div>
      </div>
    </div>
  );
};

export default AddPanelBetween;