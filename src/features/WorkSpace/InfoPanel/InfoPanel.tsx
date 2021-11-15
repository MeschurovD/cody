import React from 'react';
import { useTypeSelector } from '../../../hooks/redux';
import styles from './infopanel.module.scss'

interface PropsType {
  id: number
}

const InfoPanel: React.FC<PropsType> = ({id}) => {

  const info = useTypeSelector(state => {
    const workSpaces = state.spaces.workSpaces
    const index = workSpaces.findIndex(item => item.id === id)
    return workSpaces[index]
  })

  return (
    <div>
      
    </div>
  );
};

export default InfoPanel;