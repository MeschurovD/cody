
//<--------------------IMPORT-------------------------->
import React from 'react';
import ButtonsMenu from '../../../../../components/ButtonsMenu/ButtonsMenu';
import Iframe from '../../../../../components/Iframe/Iframe';
import Resizable from '../../../../../components/Resizable/Resizable';
import { useTypeSelector } from '../../../../../hooks/redux';
import { CodePanelType } from '../../../../../reducer/types/codeTypes';
import { getCumulativeCode } from '../../utils/cumulativeCode';
import HeaderPanel from '../HeaderPanel/HeaderPanel';
import styles from './iframeWindow.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  item: CodePanelType
  first: boolean
  end: boolean
}


//<--------------------COMPONENT----------------------->
const IframeWindow: React.FC<PropsType> = ({item, first, end}) => {


//<--------------------DATA AND STATES----------------->
  const cumulativeCode = useTypeSelector(state => {
    const workSpace = state.code.workSpace
    return getCumulativeCode(workSpace, item)
  })

  const isMoveUp = !first
  const isMoveDown = !end


//<--------------------JSX COMPONENT------------------->
  return (
      <HeaderPanel item={item} isMoveUp={isMoveUp} isMoveDown={isMoveDown}>
        {/* <ButtonsMenu id={item.id} isRemove={true} isMoveUp={isMoveUp} isMoveDown={isMoveDown} /> */}
        <Iframe code={cumulativeCode.join('\n')}/>
      </HeaderPanel>

  );
};

export default IframeWindow;