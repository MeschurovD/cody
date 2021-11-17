
//<--------------------IMPORT-------------------------->
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteWorkSpace, getWorkSpace } from '../../../../Firebase/actions/firestoreAction';
import { useTypeDispatch } from '../../../../hooks/redux';
import { changeName, removeSpace } from '../../../../reducer/spacesSlice';
import { SpaceType } from '../../../../reducer/types/spacesTypes';
import styles from './spaceCard.module.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  item: SpaceType
}


//<--------------------COMPONENT----------------------->
const SpaceCard: React.FC<PropsType> = ({ item }) => {


  //<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()
  const [name, setName] = useState(item.name)


  //<--------------------HANDLERS------------------------>
  const onClickChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const saveName = () => {
    dispatch(changeName({ id: item.id, name }))
  }

  const onClickRemove = () => {
    dispatch(removeSpace({ id: item.id }))
    deleteWorkSpace(String(item.id))
  }

  const onClickWorkSpace = () => {
    console.log('id ' + item.id)
    
  }


  //<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.card}>
      <input type="text" value={name} onChange={onClickChangeName} onBlur={saveName} />
      <NavLink to={`/work_space/${item.id}`}>
        <div onClick={onClickWorkSpace}>
          `{item.name} {item.id}`
        </div>
      </NavLink>
      <button onClick={onClickRemove} >Remove</button>
    </div>
  );
};

export default SpaceCard;