import React, { useEffect, useState } from 'react';
import { useTypeDispatch, useTypeSelector } from '../../../hooks/redux';
import { changeName } from '../../../reducer/spacesSlice';
import styles from './infopanel.module.scss'

interface PropsType {
  id: string
}

const InfoPanel: React.FC<PropsType> = ({id}) => {

  const dispatch = useTypeDispatch()

  const info = useTypeSelector(state => {
    const workSpaces = state.spaces.workSpaces
    console.log(workSpaces)
    const index = workSpaces.findIndex(item => item.id === id)
    console.log(index)
    return workSpaces[index].name
  })
  console.log('info ' + info)

  const [name, setName] = useState('')

  useEffect(() => {
    setName(info)
  }, [info])
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }


  const saveName = () => {
    dispatch(changeName({ id, name }))
  }

  return (
    <div className={styles.info}>
      <input type="text" value={name} onChange={onChangeInput} onBlur={saveName} />
    </div>
  );
};

export default InfoPanel;