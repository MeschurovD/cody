
//<--------------------IMPORT-------------------------->
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import CheckButton from '../../../../components/CheckButton/CheckButton';
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

  const deleteIcon = `bx bxs-trash ${styles.delete_button}`


//<--------------------HANDLERS------------------------>
  const saveName = () => {
    dispatch(changeName({ id: item.id, name }))
  }

  const onClickChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const onClickRemove = (event: React.MouseEvent<HTMLElement>) => {
    dispatch(removeSpace({ id: item.id }))
    deleteWorkSpace(String(item.id))
  }


//<--------------------JSX COMPONENT------------------->
  return (

    <div className={styles.card}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <input type="text" value={name} onChange={onClickChangeName} onBlur={saveName} />
          {
            (item.id !== 'example')
            && <CheckButton className={styles.delete} onClickYesFunction={onClickRemove} text='Удалить' icon='bx bxs-trash' >
              <i className={deleteIcon}></i>
            </CheckButton>
          }
        </div>
        <NavLink className={styles.nav} to={`/work_space/${item.id}`}>
          <div className={styles.go}>
            <div className={styles.go_icon}>
              <i className='bx bx-play' ></i>
            </div>
            <div className={styles.text}>
              Начать
            </div>
          </div>
        </NavLink>
      </div>
    </div>

  );
};

export default SpaceCard;