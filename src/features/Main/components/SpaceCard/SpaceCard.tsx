import React from 'react';
import { NavLink } from 'react-router-dom';
import { SpaceType } from '../../../../reducer/types/spacesTypes';
import styles from './spaceCard.module.scss'

interface PropsType {
  item: SpaceType
}

const SpaceCard: React.FC<PropsType> = ({ item }) => {
  return (
    <div className={styles.card}>
      <NavLink to={`/work_space/${item.id}`}>
        `{item.name} {item.id}` 
      </NavLink>
    </div>
  );
};

export default SpaceCard;