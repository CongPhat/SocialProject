import {ACTION_TODO} from './ToDoList.Action';

interface IInitState{
  myTodoList: Object[],
}

export const initStateToDoList:IInitState = {
  myTodoList: [
    {id: 0, work: 'Đi học'},
    {id: 1, work: 'Đi làm'}
  ]
}

export const ToDoListReducer = (state = initStateToDoList, action:any) => {
  const {myTodoList} = state;
  switch(action.type) {
    case ACTION_TODO.ADD_TODO_LIST:
      const index = myTodoList.length === 0 ? 0 : myTodoList.length;
      const arrayNew = [...myTodoList, {id: index, work: action.value}]
      return {
        ...state,
        myTodoList: arrayNew
      }
    default :
      return state
  }
}
