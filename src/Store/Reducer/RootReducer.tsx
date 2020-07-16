import {ToDoListReducer} from './ToDoList/ToDoList.Reducer';
import {LoginReducer} from './Login/Login.Reducer';
import {UserReducer} from './User/User.Reducer';
import {MarketReducer} from './Market/Market.Reducer';
import {combineReducers} from 'redux';

export const RootReducer = combineReducers({
  toDoList: ToDoListReducer,
  login: LoginReducer,
  user: UserReducer,
  market: MarketReducer
})
