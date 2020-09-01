import { searchAPI, loadMessageAPI } from './Chats.Services'
import { debounce } from 'lodash'

interface IACTION_CHATS {
  ADD_USER_CHAT: string
  SET_CONTENT_CHAT: string
}

export const ACTION_CHATS: IACTION_CHATS = {
  ADD_USER_CHAT: 'ADD_USER_CHAT',
  SET_CONTENT_CHAT: 'SET_CONTENT_CHAT',
}
export const AddUserChat = (itemUser: any) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_CHATS.ADD_USER_CHAT, payload: itemUser })
    try {
      const responSearch = await loadMessageAPI(itemUser._id)
      console.log(responSearch)
      dispatch({
        type: ACTION_CHATS.SET_CONTENT_CHAT,
        payload: {
          data: responSearch.data.data,
          idUser: itemUser._id,
        },
      })
    } catch (err) {
      // dispatch(getMarketFailed());
      // dispatch({ type: ACTION_LOGIN.LOADING })
    }
  }
}
