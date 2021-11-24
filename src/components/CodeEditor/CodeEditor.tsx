
//<--------------------IMPORT-------------------------->
import Monaco, { OnChange } from '@monaco-editor/react'
import { useRef } from 'react'
import { useTypeSelector } from '../../hooks/redux'


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
 

//<--------------------HANDLERS------------------------>
  const onChangeInput: OnChange = (newValue, e) => {
    onChange(newValue)
    editorRef.current = newValue
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