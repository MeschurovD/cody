
//<--------------------IMPORT-------------------------->
import React from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';
import CodeSpace from './CodeSpase/CodeSpace';
import InfoPanel from './InfoPanel/InfoPanel';

import styles from './workSpace.module.scss'


//<--------------------COMPONENT----------------------->
const WorkSpace: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const params: {id: string} = useParams()


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.work_space}>
      <Header />
      <InfoPanel id={Number(params.id)} />
      <div className={styles.code_space}>
        <CodeSpace />
      </div>
    </div>
  );
};

export default WorkSpace;