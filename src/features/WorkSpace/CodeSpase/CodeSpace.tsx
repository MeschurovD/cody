import React from 'react';
import { useTypeDispatch, useTypeSelector } from '../../../hooks/redux';
import { addCodePanel, addIframe } from '../../../reducer/codeSlice';
import AddButtonPanel from './components/AddButtonPanel/AddButtonPanel';

import styles from './codeSpace.module.scss'
import CodePanel from './components/CodePanel/CodePanel';
import IframeWindow from './components/IframeWindow/IframeWindow';

const CodeSpace: React.FC = () => {


  const dispatch = useTypeDispatch()
  const workSpace = useTypeSelector(state => state.code.workSpace)

  const workSpaceItems = workSpace.map((item, key) => {
    console.log(item)
    if (item.type === 'code') {
      return <CodePanel key={key} />
    }
    if (item.type === 'iframe') {
      console.log('iframe')
      return <IframeWindow key={key} />
    }
  })

  const onClickCodeButton = () => {
    dispatch(addCodePanel())
  }

  const onClickWindowButton = () => {
    dispatch(addIframe())
  }

  console.log(workSpaceItems)
  return (
    <div className={styles.code_space}>
      {workSpaceItems}
      <AddButtonPanel onClickCodeButton={onClickCodeButton} onClickWindowButton={onClickWindowButton} />
    </div>
  );
};

export default CodeSpace;