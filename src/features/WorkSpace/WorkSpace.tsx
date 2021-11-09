import React from 'react';
import CodeSpace from './CodeSpase/CodeSpace';

import styles from './workSpace.module.scss'

const WorkSpace: React.FC = () => {

  const changeTheme = () => {
    document.body.classList.toggle(styles.dark_theme)
  }

  return (
    <div className={styles.work_space}>
      <button onClick={changeTheme}>theme</button>
     
      <div className={styles.code_space}>
        <CodeSpace />
      </div>
    </div>
  );
};

export default WorkSpace;