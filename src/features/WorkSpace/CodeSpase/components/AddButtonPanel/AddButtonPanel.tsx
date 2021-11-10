import React from 'react';
import AddButton from '../../../../../components/AddButton/AddButton';

import styles from './addButtonPanel.module.scss'

interface PropsType {
  onClickCodeButton: Function
  onClickWindowButton: Function
}

const AddButtonPanel: React.FC<PropsType> = (props) => {

  const codeIcon = 'bx bx-code-alt'
  const windowIcon = 'bx bx-window'

  const onClickCodeButton = () => {
    console.log('onClickCodeButton')
    props.onClickCodeButton()
  }

  const onClickWindowButton = () => {
    console.log('onClickWindowButton')
    props.onClickWindowButton()
  }
  return (
    <div className={styles.panel}>
      <AddButton icon={codeIcon} onClickButton={onClickCodeButton} >Code</AddButton>
      <AddButton icon={windowIcon} onClickButton={onClickWindowButton} >Window</AddButton>
    </div>
  );
};

export default AddButtonPanel;