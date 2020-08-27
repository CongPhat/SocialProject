import { ACTION_USER } from './User.Action'
import jwt from 'jsonwebtoken'

const {
  GET_USER_BEFORE,
  GET_USER_SUCCESS,
  GET_USER_AFTER,
  GET_USER_FAILED,
  DELETE_USER,
  LOADING_BTN,
  MODAL_FRIEND,
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
  loadingBtn: boolean
  showModalFriend: boolean
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
  loadingBtn: false,
  showModalFriend: false,
}

export const UserReducer = (state = initStateUser, action: any) => {
  switch (action.type) {
    case SET_DATA_USER:
      return {
        ...state,
        detailUser: action.payload,
        loadingBtn: false,
        showModalFriend: false,
      }
    case LOADING_BTN:
      return {
        ...state,
        loadingBtn: !state.loadingBtn,
      }
    case MODAL_FRIEND:
      return {
        ...state,
        showModalFriend: !state.showModalFriend,
      }
    default:
      return state
  }
}
