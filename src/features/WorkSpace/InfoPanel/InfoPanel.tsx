import React from 'react';
import { useTypeSelector } from '../../../hooks/redux';
import styles from './infopanel.module.scss'

interface PropsType {
  id: number
}

const InfoPanel: React.FC<PropsType> = ({id}) => {

  const info = useTypeSelector(state => {
    const workSpaces = state.spaces.workSpaces
    console.log(workSpaces)
    console.log(id)
    const index = workSpaces.findIndex(item => item.id === id)
    console.log(index)
    return workSpaces[index]
  })
  console.log(info)

  return (
    <div className={styles.info}>
      {info}
    </div>
  );
};

export default InfoPanel;