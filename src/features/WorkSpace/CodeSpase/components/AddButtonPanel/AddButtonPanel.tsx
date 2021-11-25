
//<--------------------IMPORT-------------------------->
import React from 'react';
import AddButton from '../../../../../components/AddButton/AddButton';
import styles from './addButtonPanel.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  onClickCodeButton: Function
  onClickWindowButton: Function
  onClickTextButton: Function
}


//<--------------------COMPONENT----------------------->
const AddButtonPanel: React.FC<PropsType> = (props) => {


//<--------------------DATA AND STATES----------------->
  const codeIcon = 'bx bx-code-alt'
  const windowIcon = 'bx bx-window'
  const textIcon = 'bx bx-text'


//<--------------------HANDLERS------------------------>
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


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.panel}>
      <AddButton icon={codeIcon} onClickButton={onClickCodeButton} >Code</AddButton>
      <AddButton icon={windowIcon} onClickButton={onClickWindowButton} >Window</AddButton>
      <AddButton icon={textIcon} onClickButton={onClickTextButton} >Text</AddButton>
    </div>
  );
};

export default AddButtonPanel;