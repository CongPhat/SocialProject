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
  SET_DATA_LIST_POST,
  SET_DATA_LIST_POST_INIT,
  LOADING_POST,
  SHOW_MODAL_POST_USER,
  SET_DATA_POST_USER,
  SET_DATA_POST_USER_MEMO,
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
  listPostUser: any
  page: number
  statusLoadPost: boolean
  loadingCallPost: boolean
  postUser: {
    showModal: boolean
    dataMemoPostUser: Array<any>
    postUser: any
  }
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
  listPostUser: [], // list post
  page: 0, // page call api
  statusLoadPost: true, // false === not call api continue
  loadingCallPost: false,
  postUser: {
    showModal: false,
    dataMemoPostUser: [],
    postUser: null,
  },
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
    case SET_DATA_LIST_POST:
      return {
        ...state,
        listPostUser: [...state.listPostUser, ...action.payload],
        page: state.page + 1,
        statusLoadPost: action.payload.length === 0 ? false : true,
        loadingCallPost: !state.loadingCallPost,
      }
    case LOADING_POST:
      return {
        ...state,
        loadingCallPost: !state.loadingCallPost,
      }
    case SET_DATA_LIST_POST_INIT:
      return {
        ...state,
        listPostUser: action.payload,
        page: 1,
        statusLoadPost: true,
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
    case SHOW_MODAL_POST_USER:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          showModal: !state.postUser.showModal,
          postUser: null,
        },
      }
    case SET_DATA_POST_USER:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          dataMemoPostUser: [...state.postUser.dataMemoPostUser, action.payload],
          postUser: action.payload,
        },
      }
    case SET_DATA_POST_USER_MEMO:
      return {
        ...state,
        postUser: {
          ...state.postUser,
          postUser: action.payload,
        },
      }
    default:
      return state
  }
}
