
//<--------------------IMPORT-------------------------->
import React, { useEffect } from 'react';
import { useTypeDispatch, useTypeSelector } from '../../../hooks/redux';
import { addCodePanel, addIframe, addText } from '../../../reducer/codeSlice';
import AddButtonPanel from './components/AddButtonPanel/AddButtonPanel';

import styles from './codeSpace.module.scss'
import CodePanel from './components/CodePanel/CodePanel';
import IframeWindow from './components/IframeWindow/IframeWindow';
import _uniqueId from 'lodash/uniqueId'
import TextEditor from './components/TextEditor/TextEditor';
import { updateWorkSpace } from '../../../Firebase/actions/firestoreAction';
import AddPanelBetween from '../../../components/AddPanelBetween/AddPanelBetween';
import lodash from 'lodash';

interface PropsType {
  id: string
}

//<--------------------COMPONENT----------------------->
const CodeSpace: React.FC<PropsType> = ({ id }) => {


  //<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const workSpace = useTypeSelector(state => state.code.workSpace)

  const workSpaceItems = workSpace.map((item, index) => {
    const first = index === 0
    const end = index === (workSpace.length - 1)
    const key = item.id
    const keyButton = item.id + String(lodash.random(100, 1000))
    if (item.type === 'code') {
      console.log('key - ' + key)
      console.log('keyb - ' + keyButton)
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <CodePanel item={item} key={key} first={first} end={end} />
        </>
      )
    } else if (item.type === 'iframe') {
      console.log(key)
      console.log(keyButton)
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <IframeWindow item={item} key={key} first={first} end={end} />
        </>
      )
    } else if (item.type === 'text') {
      console.log(key)
      console.log(keyButton)
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <TextEditor item={item} key={key} first={first} end={end} />
        </>
      )
    }
  })

  useEffect(() => {
    console.log('update codeSpace')
    updateWorkSpace(id, workSpace)
  }, [workSpace])


  //<--------------------HANDLERS------------------------>
  const onClickCodeButton = () => {
    dispatch(addCodePanel({ id: Date.now() }))
  }

  const onClickWindowButton = () => {
    dispatch(addIframe({ id: Date.now() }))
  }

  const onClickTextButon = () => {
    dispatch(addText({ id: Date.now() }))
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.code_space}>
      {workSpaceItems}
      <AddButtonPanel
        key={Date.now() + lodash.random(1000, 1500)}
        onClickCodeButton={onClickCodeButton}
        onClickWindowButton={onClickWindowButton}
        onClickTextButton={onClickTextButon}
      />
    </div>
  );
};

export default CodeSpace;