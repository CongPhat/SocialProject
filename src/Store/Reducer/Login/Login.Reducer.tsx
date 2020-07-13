import {ACTION_LOGIN} from './Login.Action';
import jwt from 'jsonwebtoken';

const {LOGIN, LOGIN_BEFORE} = ACTION_LOGIN;

interface IInitState{
  privateLogin: boolean,
  dataUser: {
    name: string,
    id: string | number,
  }
}

export interface IDataUserDecode{
  name: string,
  iat: number,
  sub: string,
}

export const initStateLogin: IInitState = {
  privateLogin: false,
  dataUser: {
    name: '',
    id: ''
  }
}

export const LoginReducer = (state = initStateLogin, action:any) => {
  switch(action.type) {
    case LOGIN:
      const {value} = action;
      const dataUserDecode: IDataUserDecode = JSON.parse(JSON.stringify(jwt.decode(value)));
      localStorage.setItem('jwtToken', action.value);
      return {
        ...state,
        privateLogin: true,
        dataUser: {
          name: dataUserDecode.name,
          id: dataUserDecode.iat
        }
      }
    case LOGIN_BEFORE:
      const jwtToken = localStorage.getItem('jwtToken');
      const dataUserDecodeToken: IDataUserDecode = JSON.parse(JSON.stringify(jwt.decode(jwtToken)));
      return {
        ...state,
        privateLogin: true,
        dataUser: {
          name: dataUserDecodeToken.name,
          id: dataUserDecodeToken.iat
        }
      }
    default :
      return state
  }
}
