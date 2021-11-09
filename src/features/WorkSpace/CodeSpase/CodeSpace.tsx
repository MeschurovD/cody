import React, { useState } from 'react';
import CodeEditor from '../../../components/CodeEditor/CodeEditor';
import AddButtonPanel from '../AddButtonPanel/AddButtonPanel';

import styles from './codeSpace.module.scss'

const CodeSpace: React.FC = () => {

  const [input, setInput] = useState<string | undefined>('')

  return (
    <div className={styles.code_space}>
      <div className={styles.item}>
        <div className={styles.control_panel}>
          <input type="text" />
        </div>
        <div className={styles.test_1}>
          <div className={styles.test_2}>
            <CodeEditor initialValue={input} onChange={setInput} />
          </div>
        </div>

      </div>
      <AddButtonPanel />
    </div>
  );
};

export default CodeSpace;