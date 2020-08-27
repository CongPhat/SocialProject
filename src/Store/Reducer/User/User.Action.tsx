import {
  getUserApi,
  getDetailUserAPI,
  addFriendAPI,
  closeFriendAPI,
  addFriendSuccessAPI,
} from './User.Services'

interface IACTION_USER {
  GET_USER_SUCCESS: string
  GET_USER_FAILED: string
  GET_USER_BEFORE: string
  GET_USER_AFTER: string
  DELETE_USER: string
  SET_DATA_USER: string
  LOADING_BTN: string
  MODAL_FRIEND: string
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
      console.log(respon)
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
