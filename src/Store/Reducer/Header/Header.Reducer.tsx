import { ACTION_HEADER } from './Header.Action'

const { NO_LOADING_SEARCH, LOADING_SEARCH, SET_DATA_SEARCH, SEARCH, NO_SEARCH } = ACTION_HEADER

interface IInitState {
  search: string
  loadingSearch: boolean
  dataSearch: Array<any>
}

export const initStateHeader: IInitState = {
  search: '',
  loadingSearch: false,
  dataSearch: [],
}

export const HeaderReducer = (state = initStateHeader, action: any) => {
  switch (action.type) {
    case LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: true,
      }
    case NO_LOADING_SEARCH:
      return {
        ...state,
        loadingSearch: false,
      }
    case SEARCH:
      return {
        ...state,
        search: action.payload,
      }
    case NO_SEARCH:
      return {
        ...state,
        search: '',
      }
    case SET_DATA_SEARCH:
      return {
        ...state,
        dataSearch: action.payload,
      }
    default:
      return state
  }
}
