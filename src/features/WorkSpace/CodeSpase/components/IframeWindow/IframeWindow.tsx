import React from 'react';
import Iframe from '../../../../../components/Iframe/Iframe';
import Resizable from '../../../../../components/Resizable/Resizable';
import styles from './iframeWindow.module.scss'

const IframeWindow: React.FC = () => {
  console.log('12345')
  return (
      <div className={styles.iframe_window}>
        <Iframe code={''}/>
      </div>

  );
};

export default IframeWindow;