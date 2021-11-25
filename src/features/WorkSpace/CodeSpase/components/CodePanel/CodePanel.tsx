
//<--------------------IMPORT-------------------------->
import React, { memo, useEffect, useState } from 'react';
import CodeEditor from '../../../../../components/CodeEditor/CodeEditor';
import Iframe from '../../../../../components/Iframe/Iframe';
import { useTypeDispatch, useTypeSelector } from '../../../../../hooks/redux';
import { updateContent } from '../../../../../reducer/codeSlice';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import parser from 'prettier/parser-babel'
import prettier from 'prettier'
import styles from './codePanel.module.scss'
import { selector } from '../../utils/selectorCumulativeCode';


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
  first: boolean
  end: boolean
}


//<--------------------COMPONENT----------------------->
const CodePanel: React.FC<PropsType> = ({item, first, end}) => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  
  const [input, setInput] = useState<string | undefined>(item.content)
  const [isIframe, setIsIframe] = useState(false)

  //Сбор всего кода с предыдущих CodePanel
  const cumulativeCode = useTypeSelector(state => selector(state, item))

  const titleIframe = isIframe ? 'Код' : 'Окно'

  const isMoveUp = !first
  const isMoveDown = !end

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


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    //Обновляем контент через 0.75 сек, если за это время не произошло изменений
    const timer = setTimeout(() => {
      dispatch(updateContent({id: item.id, content: input}))
    }, 750)

    return () => {
      clearTimeout(timer)
    } 
  }, [input])


//<--------------------HANDLERS------------------------>
  const onClickIframe = () => {
    setIsIframe(!isIframe)
  }

  const ChangeFormat = () => {
    const formatted = prettier.format(input ? input : '', {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    })
    setInput(formatted)
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <HeaderPanel item={item} isMoveUp={isMoveUp} isMoveDown={isMoveDown} >
      <div className={styles.control_panel}>
        <button className={styles.button} onClick={onClickIframe}>{titleIframe}</button>
        <button className={styles.button} onClick={ChangeFormat}>Форматирование</button>
      </div>
      <div className={styles.code_space}>
        {codeSpace}
      </div>

    </HeaderPanel>
  );
};

export default memo(CodePanel);