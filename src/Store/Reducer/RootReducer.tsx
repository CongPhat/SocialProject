import { ToDoListReducer } from './ToDoList/ToDoList.Reducer'
import { LoginReducer } from './Login/Login.Reducer'
import { UserReducer } from './User/User.Reducer'
import { MarketReducer } from './Market/Market.Reducer'
import { combineReducers } from 'redux'
import { PostsReducer } from './Posts/Posts.Reducer'

export const RootReducer = combineReducers({
  toDoList: ToDoListReducer,
  LoginReducer,
  user: UserReducer,
  market: MarketReducer,
  PostsReducer,
})
