import { loginAPI, createPostAPI } from './Home.Services'
import { ACTION_POSTS } from '../Posts/Posts.Action'

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
export const createPostAction = (formData: any) => {
  return async function(dispatch: any, getState: any) {
    const respon = await createPostAPI(formData)
    if (respon) {
      dispatch({ type: ACTION_HOME.SHOW_MODAL_CREATE_POST })
      dispatch({ type: ACTION_POSTS.INSERT_POST_NEW, payload: respon.data.data })
    }

    // dispatch({ type: ACTION_HOME.CREATE_POST })
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
