import React from 'react';
import ViewTodoListContainer from './container/ViewList/ViewList.container';

interface Props {

}

const ToDoList: React.FC<Props> = ({}) => {

  return (
    <div>
      <ViewTodoListContainer />
    </div>
  )
}

export default ToDoList
