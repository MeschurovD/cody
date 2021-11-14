import React from 'react';
import Iframe from '../../../../../components/Iframe/Iframe';
import Resizable from '../../../../../components/Resizable/Resizable';
import { useTypeSelector } from '../../../../../hooks/redux';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import { getCumulativeCode } from '../../utils/cumulativeCode';
import styles from './iframeWindow.module.scss'

interface PropsType {
  item: CodePanelType
}

const IframeWindow: React.FC<PropsType> = ({item}) => {

  const cumulativeCode = useTypeSelector(state => {
    const workSpace = state.code.workSpace
    return getCumulativeCode(workSpace, item)
  })

  console.log(cumulativeCode)
  return (
      <div className={styles.iframe_window}>
        <Iframe code={cumulativeCode.join('\n')}/>
      </div>

  );
};

export default IframeWindow;