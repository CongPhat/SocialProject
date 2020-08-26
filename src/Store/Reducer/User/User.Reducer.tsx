import { ACTION_USER } from './User.Action'
import jwt from 'jsonwebtoken'

const {
  GET_USER_BEFORE,
  GET_USER_SUCCESS,
  GET_USER_AFTER,
  GET_USER_FAILED,
  DELETE_USER,
  SET_DATA_USER,
} = ACTION_USER

interface IInitState {
  loading: boolean
  data: Array<any>
  detailUser: {
    _id: string
    email: string
    image: string
    name: string
    description: string
    totalPost: number
    totalFriend: number
  } & null
}

export interface IDataUserDecode {
  name: string
  iat: number
  sub: string
}

export const initStateUser: IInitState = {
  loading: false,
  data: [],
  detailUser: null,
}

export const UserReducer = (state = initStateUser, action: any) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        detailUser: action.payload,
      }
    default:
      return state
  }
}
