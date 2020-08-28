import {
  getUserApi,
  getDetailUserAPI,
  getListPostUserAPI,
  addFriendAPI,
  closeFriendAPI,
  addFriendSuccessAPI,
  getPostUserAPI,
} from './User.Services'
import { debounce } from 'lodash'

interface IACTION_USER {
  GET_USER_SUCCESS: string
  GET_USER_FAILED: string
  GET_USER_BEFORE: string
  GET_USER_AFTER: string
  DELETE_USER: string
  SET_DATA_USER: string
  LOADING_BTN: string
  MODAL_FRIEND: string
  SET_DATA_LIST_POST: string
  SET_DATA_LIST_POST_INIT: string
  LOADING_POST: string
  SHOW_MODAL_POST_USER: string
  SET_DATA_POST_USER: string
  SET_DATA_POST_USER_MEMO: string
}

export const ACTION_USER: IACTION_USER = {
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILED: 'GET_USER_FAILED',
  GET_USER_BEFORE: 'GET_USER_BEFORE',
  GET_USER_AFTER: 'GET_USER_AFTER',
  DELETE_USER: 'DELETE_USER',
  SET_DATA_USER: 'SET_DATA_USER',
  LOADING_BTN: 'LOADING_BTN',
  MODAL_FRIEND: 'MODAL_FRIEND',
  SET_DATA_LIST_POST: 'SET_DATA_LIST_POST',
  SET_DATA_LIST_POST_INIT: 'SET_DATA_LIST_POST_INIT',
  LOADING_POST: 'LOADING_POST',
  SHOW_MODAL_POST_USER: 'SHOW_MODAL_POST_USER',
  SET_DATA_POST_USER: 'SET_DATA_POST_USER',
  SET_DATA_POST_USER_MEMO: 'SET_DATA_POST_USER_MEMO',
}

export const loading = () => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.GET_USER_BEFORE })
  }
}
export const getUserSuccess = (data: any) => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.GET_USER_SUCCESS, data: data })
  }
}
export const getUserFailed = () => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.GET_USER_FAILED })
  }
}
export const getUserAfter = () => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.GET_USER_AFTER })
  }
}
export const fetchUser = () => {
  return async function(dispatch: any) {
    dispatch(loading())
    try {
      const respon = await getUserApi()
      dispatch(getUserSuccess(respon.data))
    } catch (err) {
      dispatch(getUserFailed())
    }
    dispatch(getUserAfter())
  }
}
export const getDetailUser = (idUser: string) => {
  return async function(dispatch: any) {
    // dispatch(loading())
    try {
      const respon = await getDetailUserAPI(idUser)
      dispatch({ type: ACTION_USER.SET_DATA_USER, payload: respon.data.data })
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const getListPostUserInit = (idUser: string) => {
  return async function(dispatch: any, getState: any) {
    const respon = await getListPostUserAPI(idUser, 0)
    dispatch({ type: ACTION_USER.SET_DATA_LIST_POST_INIT, payload: respon.data.data })
    try {
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const getListPostUser = (idUser: string) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.LOADING_POST })
    const { user } = getState()
    const { page } = user
    const respon = await getListPostUserAPI(idUser, page)
    dispatch({ type: ACTION_USER.SET_DATA_LIST_POST, payload: respon.data.data })
    try {
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const closeModalPostUser = () => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.SHOW_MODAL_POST_USER })
  }
}
export const showModalPostUser = (idPost: string) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.SHOW_MODAL_POST_USER })
    const {
      user: {
        postUser: { dataMemoPostUser },
      },
    } = getState()
    const dataFind = dataMemoPostUser.find((item: any) => item._id === idPost)
    if (dataFind) {
      dispatch({ type: ACTION_USER.SET_DATA_POST_USER_MEMO, payload: dataFind })
    } else {
      const respon = await getPostUserAPI(idPost)
      dispatch({ type: ACTION_USER.SET_DATA_POST_USER, payload: respon.data.data })
    }
    try {
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const addFriend = (idFriend: string) => {
  return async function(dispatch: any) {
    dispatch({ type: ACTION_USER.LOADING_BTN })
    try {
      const respon = await addFriendAPI(idFriend)
      dispatch(getDetailUser(idFriend))
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const addFriendSuccess = (idFriend: string) => {
  return async function(dispatch: any) {
    dispatch({ type: ACTION_USER.LOADING_BTN })
    try {
      const respon = await addFriendSuccessAPI(idFriend)
      dispatch(getDetailUser(idFriend))
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const closeFriend = (idFriend: string) => {
  return async function(dispatch: any) {
    dispatch({ type: ACTION_USER.LOADING_BTN })
    try {
      const respon = await closeFriendAPI(idFriend)
      dispatch(getDetailUser(idFriend))
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch(getUserAfter())
  }
}
export const actionModalFriend = () => {
  return async function(dispatch: any) {
    dispatch({ type: ACTION_USER.MODAL_FRIEND })
  }
}
export const deleteUser = (idUser: any) => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.DELETE_USER, idDelete: idUser })
    dispatch(fetchUser())
  }
}
