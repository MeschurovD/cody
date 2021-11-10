import React, { useEffect, useState } from 'react';
import CodeEditor from '../../../../../components/CodeEditor/CodeEditor';
import Iframe from '../../../../../components/Iframe/Iframe';
import Resizable from '../../../../../components/Resizable/Resizable';
import { build } from '../../../../../esBuild/esbuild';
import styles from './codePanel.module.scss'

const CodePanel: React.FC = () => {

  const [input, setInput] = useState<string | undefined>('')
  const [isIframe, setIsIframe] = useState(true)

  // useEffect(() => {
  //   const timer = setTimeout(async () => {
  //     const output = await build(input)
  //   })
  // })

  const onClickIframe = () => {
    setIsIframe(!isIframe)
  }

  const codeSpace = isIframe
    ? (
      <div className={styles.code_editor_iframe}>
        <Iframe code={input}/>
      </div>
    )
    : (
      <div className={styles.code_editor}>
        <CodeEditor initialValue={input} onChange={setInput} />
      </div>
    )

  return (
    <div className={styles.item}>
      <div className={styles.control_panel}>
        <input type="text" />
        <button onClick={onClickIframe}>iframe</button>
      </div>
      <div className={styles.code_space}>
        {codeSpace}
      </div>

    </div>
  );
};

export default CodePanel;