
//<--------------------IMPORT-------------------------->
import React, { memo, useEffect, useState } from 'react';
import ButtonsMenu from '../../../../../components/ButtonsMenu/ButtonsMenu';
import CodeEditor from '../../../../../components/CodeEditor/CodeEditor';
import Iframe from '../../../../../components/Iframe/Iframe';
import Resizable from '../../../../../components/Resizable/Resizable';
import { useTypeDispatch, useTypeSelector } from '../../../../../hooks/redux';
import { updateCode } from '../../../../../reducer/codeSlice';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import { getCumulativeCode } from '../../utils/cumulativeCode'
import styles from './codePanel.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
}


//<--------------------COMPONENT----------------------->
const CodePanel: React.FC<PropsType> = ({item}) => {

  const dispatch = useTypeDispatch()
  const [input, setInput] = useState<string | undefined>('')
  const [isIframe, setIsIframe] = useState(false)

  const cumulativeCode = useTypeSelector(state => {
    const workSpace = state.code.workSpace
    return getCumulativeCode(workSpace, item)
  })

  console.log(cumulativeCode)


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    
    const timer = setTimeout(() => {
      dispatch(updateCode({id: item.id, code: input}))
    }, 750)

    return () => {
      clearTimeout(timer)
    } 
    
  }, [input])


//<--------------------HANDLERS------------------------>
  const onClickIframe = () => {
    setIsIframe(!isIframe)
  }

  const codeSpace = isIframe
    ? (
      <div className={styles.code_editor_iframe}>
        <Iframe code={cumulativeCode.join('\n')}/>
      </div>
    )
    : (
      <div className={styles.code_editor}>
        <CodeEditor initialValue={input} onChange={setInput} />
      </div>
    )


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.item}>
      <div className={styles.control_panel}>
        <input type="text" />
        <button onClick={onClickIframe}>iframe</button>
        <ButtonsMenu id={item.id} isRemove={true} isMoveUp={true} isMoveDown={true} />
      </div>
      <div className={styles.code_space}>
        {codeSpace}
      </div>

    </div>
  );
};

export default memo(CodePanel);