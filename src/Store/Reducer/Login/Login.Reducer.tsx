import { ACTION_LOGIN } from './Login.Action'
import jwt from 'jsonwebtoken'
import Axios from 'axios'

const { LOGIN, LOGIN_BEFORE, LOADING, LOG_OUT } = ACTION_LOGIN

interface IInitState {
  privateLogin: boolean
  dataUser: {
    email: string
    image: string
    name: string
    id: string
  }
  loading: boolean
}

export interface IDataUserDecode {
  email: string
  iat: number
  image: string
  name: string
  sub: string
  id: string
}

export const initStateLogin: IInitState = {
  privateLogin: false,
  dataUser: {
    email: '',
    image: '',
    name: 'name',
    id: '',
  },
  loading: false,
}

export const LoginReducer = (state = initStateLogin, action: any) => {
  switch (action.type) {
    case LOGIN:
      const dataUserDecode: IDataUserDecode = JSON.parse(JSON.stringify(jwt.decode(action.payload)))
      localStorage.setItem('jwtToken', action.payload)
      Axios.defaults.headers.common['Authorization'] = action.payload
      return {
        ...state,
        privateLogin: true,
        dataUser: {
          email: dataUserDecode.email,
          image: dataUserDecode.image,
          name: dataUserDecode.name,
          id: dataUserDecode.id,
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
          image: dataUserDecodeToken.image,
          name: dataUserDecodeToken.name,
          id: dataUserDecodeToken.id,
        },
      }
    case LOG_OUT:
      localStorage.removeItem('jwtToken')
      return {
        ...state,
        privateLogin: false,
        dataUser: {
          email: '',
          image: '',
          name: '',
          id: '',
        },
      }
    default:
      return state
  }
}
