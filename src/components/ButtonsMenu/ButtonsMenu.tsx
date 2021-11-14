import React from 'react';
import { useTypeDispatch } from '../../hooks/redux';
import { deleteItem, moveDown, moveUp } from '../../reducer/codeSlice';

interface PropsType {
  id: string
  isRemove?: boolean
  isMoveUp?: boolean
  isMoveDown?: boolean
}

const ButtonsMenu: React.FC<PropsType> = ({id, isRemove = false, isMoveUp = false, isMoveDown = false}) => {
  console.log('button')
  console.log(id)

  const dispatch = useTypeDispatch()

  const onClickRemove = () => {
    dispatch(deleteItem({id}))
  }

  const onClickMoveUp = () => {
    dispatch(moveUp({id}))
  }

  const onClickMoveDown = () => {
    dispatch(moveDown({id}))
  }

  return (
    <div>
      {isRemove && <button onClick={onClickRemove} >remove</button>}
      {isMoveUp && <button onClick={onClickMoveUp} >move up</button>}
      {isMoveDown && <button onClick={onClickMoveDown}>move down</button>}
    </div>
  );
};

export default ButtonsMenu;