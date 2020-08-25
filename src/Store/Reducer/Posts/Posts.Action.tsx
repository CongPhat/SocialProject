import { getAll } from '@Modules/Home/service'

interface IACTION_POTST {
  GET_LIST_POST: string
  GET_LIST_SUCCESS: string
}

export const ACTION_POSTS: IACTION_POTST = {
  GET_LIST_POST: 'GET_LIST_POST',
  GET_LIST_SUCCESS: 'GET_LIST_SUCCESS',
}
export const getDataSuccess = (data: any) => {
  return function(dispatch: any) {
    dispatch({ type: ACTION_POSTS.GET_LIST_SUCCESS, data: data })
  }
}
export const fetchDataPosts = (data?: any) => {
  return async function(dispatch: any, getState: any) {
    try {
      const respon = await getAll()
      console.log(respon)

      dispatch(getDataSuccess(respon.data))
    } catch {}
  }
}
