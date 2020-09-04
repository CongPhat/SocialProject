import { ACTION_HOME } from './Home.Action'
import jwt from 'jsonwebtoken'
import Axios from 'axios'

const { SHOW_MODAL_CREATE_POST } = ACTION_HOME

interface IInitState {
  showModalCreatePost: boolean
}

export interface IDataUserDecode {
  email: string
  iat: number
  image: string
  name: string
  sub: string
  id: string
}

export const initStateHome: IInitState = {
  showModalCreatePost: false,
}

export const HomeReducer = (state = initStateHome, action: any) => {
  switch (action.type) {
    case SHOW_MODAL_CREATE_POST:
      return {
        ...state,
        showModalCreatePost: !state.showModalCreatePost,
      }
    default:
      return state
  }
}
