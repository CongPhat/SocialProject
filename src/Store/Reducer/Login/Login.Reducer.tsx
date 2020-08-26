import { ACTION_LOGIN } from './Login.Action'
import jwt from 'jsonwebtoken'

const { LOGIN, LOGIN_BEFORE, LOADING } = ACTION_LOGIN

interface IInitState {
  privateLogin: boolean
  dataUser: {
    email: string
  }
  loading: boolean
}

export interface IDataUserDecode {
  email: string
  iat: number
  sub: string
}

export const initStateLogin: IInitState = {
  privateLogin: false,
  dataUser: {
    email: '',
  },
  loading: false,
}

export const LoginReducer = (state = initStateLogin, action: any) => {
  switch (action.type) {
    case LOGIN:
      const dataUserDecode: IDataUserDecode = JSON.parse(JSON.stringify(jwt.decode(action.payload)))
      localStorage.setItem('jwtToken', action.payload)
      return {
        ...state,
        privateLogin: true,
        dataUser: {
          email: dataUserDecode.email,
        },
      }
    case LOADING:
      return {
        ...state,
        loading: !state.loading,
      }
    case LOGIN_BEFORE:
      const jwtToken = localStorage.getItem('jwtToken')
      const dataUserDecodeToken: IDataUserDecode = JSON.parse(JSON.stringify(jwt.decode(jwtToken)))
      return {
        ...state,
        privateLogin: true,
        dataUser: {
          email: dataUserDecodeToken.email,
        },
      }
    default:
      return state
  }
}
