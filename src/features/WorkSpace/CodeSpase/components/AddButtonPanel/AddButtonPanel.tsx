import React from 'react';
import AddButton from '../../../../../components/AddButton/AddButton';

import styles from './addButtonPanel.module.scss'

interface PropsType {
  onClickCodeButton: Function
  onClickWindowButton: Function
  onClickTextButton: Function
}

const AddButtonPanel: React.FC<PropsType> = (props) => {

  const codeIcon = 'bx bx-code-alt'
  const windowIcon = 'bx bx-window'
  const textIcon = 'bx bx-text'

  const onClickCodeButton = () => {
    console.log('onClickCodeButton')
    props.onClickCodeButton()
  }

  const onClickWindowButton = () => {
    console.log('onClickWindowButton')
    props.onClickWindowButton()
  }

  const onClickTextButton = () => {
    console.log('onClickTextButton')
    props.onClickTextButton()
  }


  return (
    <div className={styles.panel}>
      <AddButton icon={codeIcon} onClickButton={onClickCodeButton} >Code</AddButton>
      <AddButton icon={windowIcon} onClickButton={onClickWindowButton} >Window</AddButton>
      <AddButton icon={textIcon} onClickButton={onClickTextButton} >Text</AddButton>
    </div>
  );
};

export default AddButtonPanel;