
//<--------------------IMPORT-------------------------->
import React, { useEffect, useState } from 'react';
import { useTypeDispatch, useTypeSelector } from '../../../hooks/redux';
import { changeName } from '../../../reducer/spacesSlice';
import styles from './infopanel.module.scss'
import { selector } from './selector';


//<--------------------TYPE---------------------------->
interface PropsType {
  id: string
}


//<--------------------COMPONENT----------------------->
const InfoPanel: React.FC<PropsType> = ({id}) => {


//<--------------------DATA AND STATES----------------->
  const dispatch = useTypeDispatch()

  const info = useTypeSelector(state => selector(state, id))

  const [name, setName] = useState('')


//<--------------------USE EFFECT---------------------->
  useEffect(() => {
    setName(info)
  }, [info])


//<--------------------HANDLERS------------------------>
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const saveName = () => {
    dispatch(changeName({ id, name }))
  }


//<--------------------JSX COMPONENT------------------->
  return (
    <div className={styles.info}>
      <input type="text" value={name} onChange={onChangeInput} onBlur={saveName} />
    </div>
  );
};

export default InfoPanel;