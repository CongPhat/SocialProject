import { loginAPI } from './Home.Services'

interface IACTION_HOME {
  SHOW_MODAL_CREATE_POST: string
}

export const ACTION_HOME: IACTION_HOME = {
  SHOW_MODAL_CREATE_POST: 'SHOW_MODAL_CREATE_POST',
}

export const actionShowModal = () => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_HOME.SHOW_MODAL_CREATE_POST })
  }
}
// export const logout = () => {
//   return async function(dispatch: any, getState: any) {
//     try {
//       dispatch({ type: ACTION_LOGIN.LOG_OUT })
//       // history.push('/')
//     } catch (err) {}
//   }
// }
