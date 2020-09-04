import { ToDoListReducer } from './ToDoList/ToDoList.Reducer'
import { LoginReducer } from './Login/Login.Reducer'
import { UserReducer } from './User/User.Reducer'
import { MarketReducer } from './Market/Market.Reducer'
import { HeaderReducer } from './Header/Header.Reducer'
import { combineReducers } from 'redux'
import { PostsReducer } from './Posts/Posts.Reducer'
import { ChatsRuducer } from './Chats/Chats.Reducer'
import { HomeReducer } from './Home/Home.Reducer'

export const RootReducer = combineReducers({
  toDoList: ToDoListReducer,
  LoginReducer,
  user: UserReducer,
  market: MarketReducer,
  PostsReducer,
  HeaderReducer,
  ChatsRuducer,
  HomeReducer,
})
