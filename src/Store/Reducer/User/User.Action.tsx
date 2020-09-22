import {
  getUserApi,
  getDetailUserAPI,
  getListPostUserAPI,
  addFriendAPI,
  closeFriendAPI,
  addFriendSuccessAPI,
  getPostUserAPI,
  addCommentAPI,
  getListCommentAPI,
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
  SET_DATA_LIST_POST: string
  SET_DATA_LIST_POST_INIT: string
  LOADING_POST: string
  SHOW_MODAL_POST_USER: string
  SET_DATA_POST_USER: string
  SET_DATA_POST_USER_MEMO: string
  ADD_COMMENT: string
  SET_DATA_LIST_COMMENT: string
  SUCCESS_COMMENT: string
  LOAD_ADD_COMMENT: string
  REPLY_COMMENT: string
  NO_REPLY_COMMENT: string
  MODAL_LIST_FRIEND: string
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
  ADD_COMMENT: 'ADD_COMMENT',
  SET_DATA_LIST_COMMENT: 'SET_DATA_LIST_COMMENT',
  SUCCESS_COMMENT: 'SUCCESS_COMMENT',
  LOAD_ADD_COMMENT: 'LOAD_ADD_COMMENT',
  REPLY_COMMENT: 'REPLY_COMMENT',
  NO_REPLY_COMMENT: 'NO_REPLY_COMMENT',
  MODAL_LIST_FRIEND: 'MODAL_LIST_FRIEND',
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
export const actionModalListFriend = (id: string) => {
  return async function(dispatch: any) {
    dispatch({ type: ACTION_USER.MODAL_LIST_FRIEND, payload: id })
  }
}
export const addComment = (data: string) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.LOAD_ADD_COMMENT })
    const {
      user: {
        postUser: { postUser },
        commentReply,
      },
    } = getState()
    try {
      const request = {
        id: postUser._id,
        comment: data,
        idParentComment: commentReply ? commentReply._id : undefined,
      }
      const respon = await addCommentAPI(request)
      dispatch({ type: ACTION_USER.SUCCESS_COMMENT, payload: respon.data.data })
    } catch (err) {
      // dispatch(getUserFailed())
    }
    // dispatch({ type: ACTION_USER.ADD_COMMENT, payload: data })
  }
}
export const commentReply = (itemComment: any) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.REPLY_COMMENT, payload: itemComment })
  }
}
export const noCommentReply = () => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_USER.NO_REPLY_COMMENT })
  }
}
export const deleteUser = (idUser: any) => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_USER.DELETE_USER, idDelete: idUser })
    dispatch(fetchUser())
  }
}
