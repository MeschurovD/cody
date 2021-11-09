import React from 'react';
import AddButton from '../../../components/AddButton/AddButton';

import styles from './addButtonPanel.module.scss'

const AddButtonPanel: React.FC = () => {

  const codeIcon = 'bx bx-code-alt'
  const windowIcon = 'bx bx-window'

  const onClickCodeButton = () => {
    console.log('onClickCodeButton')
  }

  const onClickWindowButton = () => {
    console.log('onClickWindowButton')
  }
  return (
    <div className={styles.panel}>
      <AddButton icon={codeIcon} onClickButton={onClickCodeButton} >Code</AddButton>
      <AddButton icon={windowIcon} onClickButton={onClickWindowButton} >Window</AddButton>
    </div>
  );
};

export default AddButtonPanel;