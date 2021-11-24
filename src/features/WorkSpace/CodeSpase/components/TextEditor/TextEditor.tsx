
//<--------------------IMPORT-------------------------->
import React, { memo, useRef } from 'react';
import { createReactEditorJS } from 'react-editor-js'
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import './editor.scss'
import { useTypeDispatch } from '../../../../../hooks/redux';
import { updateContent } from '../../../../../reducer/codeSlice';
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import List from '@editorjs/list'
import Header from '@editorjs/header'


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

  const instanseRef = useRef()

  const TextEditor = createReactEditorJS()

  const tools = {
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    list: List,
    header: Header
  }


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
        tools={tools}
        data={item.content}
        minHeight={10}
        onInitialize={handleInitialize}
        onChange={saveChange}
        placeholder={'Введите текст'}
      />
    </HeaderPanel>
  );
};

export default memo(TextEditor);