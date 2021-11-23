
//<--------------------IMPORT-------------------------->
import React, { useEffect, useState } from 'react';
import ButtonsMenu from '../../../../../components/ButtonsMenu/ButtonsMenu';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import styles from './headerpanel.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
  isMoveUp: boolean
  isMoveDown: boolean
}


//<--------------------COMPONENT----------------------->
const HeaderPanel: React.FC<PropsType> = ({ children, item, isMoveUp, isMoveDown }) => {


  //<--------------------DATA AND STATES----------------->
  const [isCollapse, setIsCollapse] = useState(false)

  const codeIcon = 'bx bx-code-alt'
  const windowIcon = 'bx bx-window'
  const textIcon = 'bx bx-text'

  const bodyStyles = isCollapse
    ? styles.collapse
    : styles.body_panel

  const collapseIcon = isCollapse
    ? 'bx bxs-chevron-right'
    : 'bx bxs-chevron-down'

  const collapseTitle = isCollapse
    ? 'Развернуть'
    : 'Свернуть'

  let type = `${styles.type_icon} `

  if (item.type === 'code') type += codeIcon
  if (item.type === 'text') type += textIcon
  if (item.type === 'iframe') type += windowIcon

  //<--------------------HANDLERS------------------------>
  const onClickCollapse = () => {
    setIsCollapse(!isCollapse)
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.panel}>
      <div className={styles.header_panel}>
        <div className={styles.left}>
          <i className={type} ></i>
          <div className={styles.collapse_button} onClick={onClickCollapse}>
            <i className={collapseIcon} ></i>
            {collapseTitle}
          </div>
        </div>
        <ButtonsMenu id={item.id} isRemove={true} isMoveUp={isMoveUp} isMoveDown={isMoveDown} />
      </div>
      <div className={bodyStyles}>
        {children}
      </div>
    </div>
  );
};

export default HeaderPanel;