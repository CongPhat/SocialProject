import { searchAPI } from './Header.Services'
import { debounce } from 'lodash'

interface IACTION_HEADER {
  LOADING_SEARCH: string
  NO_LOADING_SEARCH: string
  SET_DATA_SEARCH: string
  SEARCH: string
  NO_SEARCH: string
}

export const ACTION_HEADER: IACTION_HEADER = {
  LOADING_SEARCH: 'LOADING_SEARCH',
  NO_LOADING_SEARCH: 'NO_LOADING_SEARCH',
  SET_DATA_SEARCH: 'SET_DATA_SEARCH',
  SEARCH: 'SEARCH',
  NO_SEARCH: 'NO_SEARCH',
}
export const NoSearch = () => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_HEADER.NO_SEARCH })
  }
}
const callApiSearch = debounce(async (dispatch, data) => {
  if (data !== '') {
    try {
      const responSearch = await searchAPI({
        search: data,
      })
      dispatch({ type: ACTION_HEADER.SET_DATA_SEARCH, payload: responSearch.data.data })
    } catch (err) {
      // dispatch(getMarketFailed());
      // dispatch({ type: ACTION_LOGIN.LOADING })
    }
  }
  dispatch({ type: ACTION_HEADER.NO_LOADING_SEARCH })
}, 400)
export const SearchData = (data: string) => {
  return async function(dispatch: any, getState: any) {
    dispatch({ type: ACTION_HEADER.LOADING_SEARCH })
    dispatch({ type: ACTION_HEADER.SEARCH, payload: data })
    callApiSearch(dispatch, data)
  }
}
