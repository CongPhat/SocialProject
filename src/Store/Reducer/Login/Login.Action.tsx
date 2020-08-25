import { loginAPI } from './Login.Services'

interface IACTION_LOGIN {
  LOGIN: string
  LOGIN_BEFORE: string
  LOADING: string
}

export const ACTION_LOGIN: IACTION_LOGIN = {
  LOGIN: 'LOGIN',
  LOGIN_BEFORE: 'LOGIN_BEFORE',
  LOADING: 'LOADING',
}

export const login = (data?: any, history?: any) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_LOGIN.LOADING })
    try {
      const respon = await loginAPI(data)
      dispatch({ type: ACTION_LOGIN.LOGIN, payload: respon.data.data })
      dispatch({ type: ACTION_LOGIN.LOADING })
      history.push('/')
    } catch (err) {
      // dispatch(getMarketFailed());
      dispatch({ type: ACTION_LOGIN.LOADING })
    }
  }
}
