import React, { useState } from 'react';
import ButtonsMenu from '../../../../../components/ButtonsMenu/ButtonsMenu';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import styles from './headerpanel.module.scss'

interface PropsType {
  item: CodePanelType
  isMoveUp: boolean
  isMoveDown: boolean
}

const HeaderPanel: React.FC<PropsType> = ({ children, item, isMoveUp, isMoveDown }) => {

  const [isCollapse, setIsCollapse] = useState(false)

  const bodyStyles = isCollapse
  ? styles.collapse
  : styles.body_panel

  const onClickCollapse = () => {
    setIsCollapse(!isCollapse)
  }
 
  console.log(styles)
  return (
    <div className={styles.panel}>
      <div className={styles.header_panel}>
        <button onClick={onClickCollapse}>collapse</button>
        <input type="text" />
        <ButtonsMenu id={item.id} isRemove={true} isMoveUp={isMoveUp} isMoveDown={isMoveDown} />
      </div>
      <div className={bodyStyles}>
        {children}
      </div>
    </div>
  );
};

export default HeaderPanel;