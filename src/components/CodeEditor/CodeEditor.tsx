import Monaco, { OnChange } from '@monaco-editor/react'
import prettier from 'prettier'
import parser from 'prettier/parser-babel'
import { useRef } from 'react'

interface PropsType {
  initialValue: string | undefined
  onChange: (value: string | undefined) => void
}

const CodeEditor: React.FC<PropsType> = ({ initialValue, onChange }) => {

  const editorRef = useRef<any>()

  const onChangeInput: OnChange = (newValue, e) => {
    onChange(newValue)
    editorRef.current = newValue
    console.log(e)
  }

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

  return (
    <div>
      <button onClick={onFormat}>Format</button>
      <Monaco
        value={initialValue}
        onChange={onChangeInput}
        language='javascript'
        theme='vs-dark'
        height='300px'
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
    </div>

  )
}

export default CodeEditor