import React from 'react';
import { useSelector } from 'react-redux';
import ToDoItem from './../../components/ToDoItem/ToDoItem.component';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props {

}

interface RootState {
  toDoList: {myTodoList: Object[]}
}


const ViewTodoListContainer: React.FC<Props> = ({history}: RouteComponentProps) => {
  const toDoList = useSelector((state: RootState) => state.toDoList.myTodoList);
  return (
    <div>
      {toDoList.map((item:any, index) => <ToDoItem item={item} key={index}/>)}
      <button onClick={() => history.push('/')}>Quay lai</button>
    </div>
  )
}

export default withRouter(ViewTodoListContainer)
