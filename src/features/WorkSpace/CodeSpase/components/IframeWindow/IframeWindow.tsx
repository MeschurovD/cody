
//<--------------------IMPORT-------------------------->
import React from 'react';
import Iframe from '../../../../../components/Iframe/Iframe';
import { useTypeSelector } from '../../../../../hooks/redux';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import styles from './iframeWindow.module.scss'
import { selector } from '../../utils/selectorCumulativeCode';


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
  first: boolean
  end: boolean
}


//<--------------------COMPONENT----------------------->
const IframeWindow: React.FC<PropsType> = ({ item, first, end }) => {


//<--------------------DATA AND STATES----------------->
  const cumulativeCode = useTypeSelector(state => selector(state, item))

  const isMoveUp = !first
  const isMoveDown = !end


//<--------------------JSX COMPONENT------------------->
  return (
    <HeaderPanel item={item} isMoveUp={isMoveUp} isMoveDown={isMoveDown}>
      <div className={styles.iframe}>
        <Iframe code={cumulativeCode.join('\n')} />
      </div>
    </HeaderPanel>

  );
};

export default IframeWindow;