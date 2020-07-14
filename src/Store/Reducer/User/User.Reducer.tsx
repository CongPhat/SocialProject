import {ACTION_USER} from './User.Action';
import jwt from 'jsonwebtoken';

const {GET_USER_BEFORE,
  GET_USER_SUCCESS,
  GET_USER_AFTER,
  GET_USER_FAILED,
  DELETE_USER
} = ACTION_USER;

interface IInitState{
  loading: boolean
  data: Array<any>
}

export interface IDataUserDecode{
  name: string,
  iat: number,
  sub: string,
}

export const initStateUser: IInitState = {
  loading: false,
  data: []
}

export const UserReducer = (state = initStateUser, action:any) => {
  console.log(action);
  switch(action.type) {
    case GET_USER_BEFORE:
      return {
        ...state,
        loading: true
      }
    case GET_USER_AFTER:
      console.log('saukhixonghet')
      return {
        ...state
      }
    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.data
      }
    case GET_USER_FAILED:
      return {
        ...state,
        loading: false
      }
    case DELETE_USER:
      return {
        ...state,
        data: state.data.filter(item => action.idDelete !== item.id)
      }
    default :
      return state
  }
}
