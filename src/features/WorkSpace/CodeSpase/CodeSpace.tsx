
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
import { setExample, updateWorkSpace } from '../../../Firebase/actions/firestoreAction';
import AddPanelBetween from '../../../components/AddPanelBetween/AddPanelBetween';
import random from 'lodash/random';


//<--------------------TYPE---------------------------->
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
    const keyButton = item.id + String(random(100, 1000))
    if (item.type === 'code') {
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <CodePanel item={item} key={key} first={first} end={end} />
        </>
      )
    } else if (item.type === 'iframe') {
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <IframeWindow item={item} key={key} first={first} end={end} />
        </>
      )
    } else if (item.type === 'text') {
      return (
        <>
          <AddPanelBetween id={item.id} key={keyButton} />
          <TextEditor item={item} key={key} first={first} end={end} />
        </>
      )
    }
  })


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    if (id !== 'example') updateWorkSpace(id, workSpace)
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

  //?????? ???????????????????? ?????????????? ?? ???????? ????????????
  const saveExample = () => {
    setExample(workSpace)
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.code_space}>
      {workSpaceItems}
      <AddButtonPanel
        key={Date.now() + random(1000, 1500)}
        onClickCodeButton={onClickCodeButton}
        onClickWindowButton={onClickWindowButton}
        onClickTextButton={onClickTextButon}
      />
      {/* <button onClick={saveExample}>?????????????????? ?????? ????????????</button> */}
    </div>
  );
};

export default CodeSpace;