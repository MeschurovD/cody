import React from 'react';
import Header from '../../components/Header/Header';
import { useTypeDispatch, useTypeSelector } from '../../hooks/redux';
import lodash from 'lodash'
import styles from './main.module.scss'
import { addSpace } from '../../reducer/spacesSlice';
import SpaceCard from './components/SpaceCard/SpaceCard';

const Main = () => {

  const dispatch = useTypeDispatch()

  const spaces = useTypeSelector(state => state.spaces.workSpaces)
  console.log(spaces)

  const WorkSpaces = spaces.map(item => {
    return <SpaceCard item={item} key={item.id} />
  })

  const onClickNewSpace = () => {
    const id = Date.now() + lodash.random(10)
    console.log(id)
    dispatch(addSpace({id, name: `Board-${lodash.uniqueId()}`}))
  }

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.add}>
        <button onClick={onClickNewSpace}>new space</button>
      </div>
      <div className={styles.spaces}>
        {WorkSpaces}
      </div>
    </div>
  );
};

export default Main;