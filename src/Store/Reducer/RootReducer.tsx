import {ToDoListReducer} from './ToDoList/ToDoList.Reducer';
import {LoginReducer} from './Login/Login.Reducer';
import {combineReducers} from 'redux';

export const RootReducer = combineReducers({
  toDoList: ToDoListReducer,
  login: LoginReducer
})
