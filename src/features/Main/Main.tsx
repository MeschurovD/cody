import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../../components/Header/Header';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import lodash from 'lodash'
import styles from './main.module.scss'
import { addSpace } from '../../reducer/spacesSlice';
import SpaceCard from './components/SpaceCard/SpaceCard';
import IsAuth from '../../components/IsAuth/IsAuth';
import { getWorkSpacesAction, setWorkSpace, setWorkSpacesAction } from '../../Firebase/actions/firestoreAction';
import { changeLogin } from '../../reducer/authSlice';

const Main = () => {

  const dispatch = useTypeDispatch()

  const spaces = useTypeSelector(state => state.spaces.workSpaces)
  const { id, isLogin } = useTypeSelector(state => state.auth)
  console.log(isLogin)
  console.log(spaces)

  useLayoutEffect(() => {
    if (isLogin && id) {
      console.log('Запрос')
      console.log(id)
      getWorkSpacesAction(id, dispatch)
    }
  }, [])

  useEffect(() => {
    if (!isLogin) {
      console.log('spaces')
      setWorkSpacesAction(spaces, id)
    }

  }, [spaces])

  const WorkSpaces = spaces.map(item => {
    return <SpaceCard item={item} key={item.id} />
  })

  const onClickNewSpace = () => {
    const id = String(Date.now() + lodash.random(10))
    console.log(id)
    dispatch(addSpace({ id, name: `Board-${lodash.uniqueId()}` }))
    setWorkSpace(id)
  }

  return (
    <IsAuth>
      <div className={styles.main}>
        <Header />
        <div className={styles.add}>
          <button onClick={onClickNewSpace}>new space</button>
        </div>
        <div className={styles.spaces}>
          {WorkSpaces}
        </div>
      </div>
    </IsAuth>
  );
};

export default Main;