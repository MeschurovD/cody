
//<--------------------IMPORT-------------------------->
import React, { useEffect, useLayoutEffect } from 'react';
import Header from '../../components/Header/Header';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import random from 'lodash/random'
import uniqueId from 'lodash/uniqueId'
import styles from './main.module.scss'
import { addSpace } from '../../reducer/spacesSlice';
import SpaceCard from './components/SpaceCard/SpaceCard';
import IsAuth from '../../components/IsAuth/IsAuth';
import { getWorkSpacesAction, setWorkSpace, setWorkSpacesAction } from '../../Firebase/actions/firestoreAction';


//<--------------------COMPONENT----------------------->
const Main: React.FC = () => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()

  const spaces = useTypeSelector(state => state.spaces.workSpaces)
  const { id, isLogin } = useTypeSelector(state => state.auth)

  const WorkSpaces = spaces.map(item => {
    return <SpaceCard item={item} key={item.id} />
  })

  const titleStyle = isLogin ? `${styles.title} ${styles.loader}` : styles.title

//<--------------------USE EFFECT---------------------->
  //Получение списка Досок
  useLayoutEffect(() => {
    if (isLogin && id) {
      console.log('Запрос')
      getWorkSpacesAction(id, dispatch)
    }
  }, [])

  //Сохранение списка Досок
  useEffect(() => {
    if (!isLogin) {
      console.log('spaces')
      setWorkSpacesAction(spaces, id)
    }
  }, [spaces])


//<--------------------HANDLERS------------------------>
  const onClickNewSpace = () => {
    const id = String(Date.now() + random(10))
    dispatch(addSpace({ id, name: `Доска-${uniqueId()}` }))
    setWorkSpace(id)
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <IsAuth>
      <div className={styles.main}>
        <Header />
        <div className={styles.spaces}>
          <div className={styles.board_header}>
            <div className={titleStyle}>
              Доски
            </div>
            <div className={styles.new_board} onClick={onClickNewSpace}>
              <i className='bx bx-plus-medical'></i>
              <span>
                Новая доска
              </span>
            </div>
          </div>
          <div className={styles.content}>
            {WorkSpaces}
          </div>
        </div>
      </div>
    </IsAuth>
  );
};

export default Main;