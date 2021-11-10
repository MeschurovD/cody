
//<--------------------IMPORT-------------------------->
import React from 'react';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';
import './resizable.scss'


//<--------------------TYPE---------------------------->
interface PropsType {
  direction: 'horizontal' | 'vertical'
}


//<--------------------COMPONENT----------------------->
const Resizable: React.FC<PropsType> = ({ direction, children }) => {

  let resizableProps: ResizableBoxProps
  if (direction === 'horizontal') {
    resizableProps = {
      width: Infinity,
      height: 300,
      resizeHandles: ['s']
    }
  } else {
    resizableProps = {
      className: 'resizable-hor',
      width: 600,
      height: Infinity,
      resizeHandles: ['e']
    }
  }


//<--------------------JSX COMPONENT------------------->
return (
  <ResizableBox {...resizableProps}>
    {children}
  </ResizableBox>
);
};

export default Resizable;