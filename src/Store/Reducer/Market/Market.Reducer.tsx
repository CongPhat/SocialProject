import {ACTION_MARKET} from './Market.Action';

const {GET_MARKET_BEFORE,
  GET_MARKET_SUCCESS,
  GET_MARKET_AFTER,
  GET_MARKET_FAILED,
  DELETE_MARKET,
  REMOVE_LOAD_DATA,
  DETAIL_ITEM_MARKET,
  UN_DETAIL_ITEM_MARKET
} = ACTION_MARKET;

interface IInitState{
  loading: boolean
  numberLoadMarket: number,
  numberPage: number,
  removeLoadData: boolean,
  data: Array<any>,
  detailItemMarket: {
    showModal: boolean,
    itemMarket: any | null,
    loadingDetail: boolean
  }
}

export interface IDataMarketDecode{
  name: string,
  iat: number,
  sub: string,
}

export const initStateMarket: IInitState = {
  loading: false,
  numberLoadMarket: 36,
  numberPage: 0,
  removeLoadData: false,
  data: [],
  detailItemMarket: {
    showModal: false,
    itemMarket: null,
    loadingDetail: false
  }
}

export const MarketReducer = (state = initStateMarket, action:any) => {
  switch(action.type) {
    case GET_MARKET_BEFORE:
      return {
        ...state,
        loading: true
      }
    case GET_MARKET_AFTER:
      console.log('saukhixonghet')
      return {
        ...state
      }
    case REMOVE_LOAD_DATA:
      return {
        ...state,
        removeLoadData: true
      }
    case GET_MARKET_SUCCESS:
      return {
        ...state,
        loading: false,
        numberPage: state.numberPage + 1,
        data: [...state.data, ...action.data]
      }
    case GET_MARKET_FAILED:
      return {
        ...state,
        loading: false
      }
    case DELETE_MARKET:
      return {
        ...state,
        data: state.data.filter(item => action.idDelete !== item.id)
      }
    case DETAIL_ITEM_MARKET:
      console.log(action);
        return {
          ...state,
          detailItemMarket: {
            ...state.detailItemMarket,
            showModal: true,
            itemMarket: action.payload
          }
        }
    case UN_DETAIL_ITEM_MARKET:
        return {
          ...state,
          detailItemMarket: {
            ...state.detailItemMarket,
            showModal: false,
            itemMarket: null
          }
        }
    default :
      return state
  }
}
