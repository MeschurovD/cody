
//<--------------------IMPORT-------------------------->
import React, { useEffect, useLayoutEffect } from 'react';
import { useParams } from 'react-router';
import Header from '../../components/Header/Header';
import IsAuth from '../../components/IsAuth/IsAuth';
import { getExample, getWorkSpace } from '../../Firebase/actions/firestoreAction';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import CodeSpace from './CodeSpase/CodeSpace';
import InfoPanel from './InfoPanel/InfoPanel';

import styles from './workSpace.module.scss'


//<--------------------COMPONENT----------------------->
const WorkSpace: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const params: { id: string } = useParams()
  const dispatch = useTypeDispatch()
  const loading = useTypeSelector(state => state.code.loading)

  useLayoutEffect(() => {
    if (loading) {
      if (params.id === 'example') {
        console.log('getExample')
        getExample(dispatch)
      } else {
        console.log('getWorkSpace')
        getWorkSpace(String(params.id), dispatch)
      }
    }
  }, [])


//<--------------------JSX COMPONENT------------------->
  return (
    <IsAuth>
      {
        loading
          ? (<div>Loading</div>)
          : (
            <div className={styles.work_space}>
              <div className={styles.header}>
                <Header />
              </div>
              <InfoPanel id={params.id} />
              <div className={styles.code_space}>
                <CodeSpace id={params.id} />
              </div>
            </div>
          )
      }
    </IsAuth>
  );
};

export default WorkSpace;