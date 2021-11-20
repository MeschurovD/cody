import Monaco, { OnChange } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'
import { useTypeSelector } from '../../hooks/redux'
// import codeshift from 'jscodeshift'
// import Highlighter from 'monaco-jsx-highlighter'


//<--------------------TYPE---------------------------->
interface PropsType {
  initialValue: string | undefined
  onChange: (value: string | undefined) => void
}


//Редактор кода VS
//<--------------------COMPONENT----------------------->
const CodeEditor: React.FC<PropsType> = ({ initialValue, onChange }) => {


  //<--------------------DATA AND STATES----------------->
  const editorRef = useRef<any>()
  const themeDark = useTypeSelector(state => state.spaces.themeDark)
  const themeStyle = themeDark ? 'vs-dark' : 'vs'
 

  // const highlighter = new Highlighter(
  //   monaco,
  //   babelParse,
  //   traverse,
  //   monacoEditor

  // )
  // highlighter.highLightOnDidChangeModelContent(100)
  // highlighter.addJSXCommentCommand()

  //<--------------------HANDLERS------------------------>
  const onChangeInput: OnChange = (newValue, e) => {
    onChange(newValue)
    editorRef.current = newValue
  }


  //Функция форматирования кода
  const onFormat = () => {
    const unformat = editorRef.current
    const format = prettier.format(unformat, {
      parser: 'babel',
      plugins: [parser],
      useTabs: false,
      semi: true,
      singleQuote: true
    })
    onChange(format)
    console.log(format)
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <Monaco
      value={initialValue}
      onChange={onChangeInput}
      language='javascript'
      theme={themeStyle}

      options={{
        wordWrap: 'on',
        minimap: { enabled: false },
        fontSize: 16,
        showUnused: false,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true
      }}
    />
  )
}

export default CodeEditor