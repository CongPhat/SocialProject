import {getUserApi} from './User.Services';
import axios from 'axios';

interface IACTION_USER{
  GET_USER_SUCCESS: string,
  GET_USER_FAILED: string,
  GET_USER_BEFORE: string
}

export const ACTION_USER: IACTION_USER = {
  GET_USER_SUCCESS: 'GET_USER_SUCCESS',
  GET_USER_FAILED: 'GET_USER_FAILED',
  GET_USER_BEFORE: 'GET_USER_BEFORE'
}

export const fetchUser = () => {
  return function(dispatch: any) {
    dispatch({type: ACTION_USER.GET_USER_BEFORE});
    getUserApi().then(res => {
      dispatch({type: ACTION_USER.GET_USER_SUCCESS, data: res.data});
    }).catch(err => dispatch({type: ACTION_USER.GET_USER_FAILED}))
    // console.log(getUserApi())
  }
}
