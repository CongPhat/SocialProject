import {getUserApi} from './User.Services';

interface IACTION_USER{
  GET_USER_SUCCESS: string,
  GET_USER_FAILED: string,
  GET_USER_BEFORE: string,
  GET_USER_AFTER: string,
  DELETE_USER: string
}

export const ACTION_USER: IACTION_USER = {
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILED: 'GET_USER_FAILED',
  GET_USER_BEFORE: 'GET_USER_BEFORE',
  GET_USER_AFTER: 'GET_USER_AFTER',
  DELETE_USER: 'DELETE_USER',
}

export const loading = () => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.GET_USER_BEFORE});
  }
}
export const getUserSuccess = (data: any) => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.GET_USER_SUCCESS, data: data});
  }
}
export const getUserFailed = () => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.GET_USER_FAILED});
  }
}
export const getUserAfter = () => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.GET_USER_AFTER});
  }
}
export const fetchUser = () => {
  return async function(dispatch: any) {
    dispatch(loading());
    try {
      const respon = await getUserApi();
      dispatch(getUserSuccess(respon.data));
    } catch (err) {
      dispatch(getUserFailed());
    }
    dispatch(getUserAfter());
  }
}
export const deleteUser = (idUser: any) => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.DELETE_USER, idDelete: idUser});
    dispatch(fetchUser());
  }
}
