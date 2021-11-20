
//<--------------------IMPORT-------------------------->
import React, { useEffect, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js'
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import styles from './textEditor.module.scss'
import './editor.scss'
import { useTypeDispatch } from '../../../../../hooks/redux';
import { updateContent } from '../../../../../reducer/codeSlice';


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
  first: boolean
  end: boolean
}


//<--------------------COMPONENT----------------------->
const TextEditor: React.FC<PropsType> = ({ item, first, end }) => {


  //<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const isMoveUp = !first
  const isMoveDown = !end

  const instanseRef = useRef(null)

  const TextEditor = createReactEditorJS()


  //<--------------------HANDLERS------------------------>
  const handleInitialize = React.useCallback(async (instance) => {
    instanseRef.current = instance
    console.log(instanseRef.current)
  }, [])

  const saveChange = async () => {
    //@ts-ignore
    const saveData = await instanseRef.current.save()
    dispatch(updateContent({ id: item.id, content: saveData }))
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <HeaderPanel item={item} isMoveUp={isMoveUp} isMoveDown={isMoveDown}>
      <TextEditor
        data={item.content}
        //maxWidth={300}
        minHeight={10}
        onInitialize={handleInitialize}
        onChange={saveChange}
        placeholder={'Введите текст'}
      />
    </HeaderPanel>
  );
};

export default TextEditor;