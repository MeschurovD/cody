
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

interface PropsType {
  id: string
}

//<--------------------COMPONENT----------------------->
const CodeSpace: React.FC<PropsType> = ({id}) => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const workSpace = useTypeSelector(state => state.code.workSpace)

  const workSpaceItems = workSpace.map((item, index) => {
    const first = index === 0
    const end = index === (workSpace.length - 1)
    if (item.type === 'code') {
      return <CodePanel item={item} key={item.id} first={first} end={end} />
    }
    if (item.type === 'iframe') {
      return <IframeWindow item={item} key={item.id} first={first} end={end} />
    }
    if (item.type === 'text') {
      return <TextEditor item={item} key={item.id} first={first} end={end} />
    }
  })

  useEffect(() => {
    console.log('update codeSpace')
    updateWorkSpace(id, workSpace)
  }, [workSpace])


//<--------------------HANDLERS------------------------>
  const onClickCodeButton = () => {
    dispatch(addCodePanel({id: Date.now()}))
  }

  const onClickWindowButton = () => {
    dispatch(addIframe({id: Date.now()}))
  }

  const onClickTextButon = () => {
    dispatch(addText({id: Date.now()}))
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.code_space}>
      {workSpaceItems}
      <AddButtonPanel onClickCodeButton={onClickCodeButton} onClickWindowButton={onClickWindowButton} onClickTextButton={onClickTextButon} />
    </div>
  );
};

export default CodeSpace;