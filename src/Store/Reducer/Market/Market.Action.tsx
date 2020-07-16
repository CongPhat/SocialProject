// import {getMARKETApi} from './MARKET.Services';
import dataMarket from '@DataTemplate/marketData.json';

interface IACTION_MARKET{
  GET_MARKET_SUCCESS: string,
  GET_MARKET_FAILED: string,
  GET_MARKET_BEFORE: string,
  GET_MARKET_AFTER: string,
  DELETE_MARKET: string,
  REMOVE_LOAD_DATA: string
}

export const ACTION_MARKET: IACTION_MARKET = {
  GET_MARKET_SUCCESS: 'GET_MARKET_SUCCESS',
  GET_MARKET_FAILED: 'GET_MARKET_FAILED',
  GET_MARKET_BEFORE: 'GET_MARKET_BEFORE',
  GET_MARKET_AFTER: 'GET_MARKET_AFTER',
  DELETE_MARKET: 'DELETE_MARKET',
  REMOVE_LOAD_DATA: 'REMOVE_LOAD_DATA'
}

export const loading = () => {
  return {type: ACTION_MARKET.GET_MARKET_BEFORE}
}
export const getMarketSuccess = (data: any) => {
  return {type: ACTION_MARKET.GET_MARKET_SUCCESS, data: data}
}
export const getMarketFailed = () => {
  return {type: ACTION_MARKET.GET_MARKET_FAILED}
}
export const getMarketAfter = () => {
  return {type: ACTION_MARKET.GET_MARKET_AFTER}
}
export const handleRemoveLoadData = () => {
    return {type: ACTION_MARKET.REMOVE_LOAD_DATA}
}

export const fetchMarket = () => {
    return async function(dispatch: any, getState: any) {
        dispatch(loading());
        try {
            const {market: {numberLoadMarket, numberPage}} = getState();
            const dataFake = dataMarket.filter((item: object, index: number) => {
                return index >= numberPage*numberLoadMarket && index < numberPage*numberLoadMarket + numberLoadMarket
            })
            dataFake.length > 0 ? dispatch(getMarketSuccess(dataFake)) : dispatch(handleRemoveLoadData());
        //   const respon = await getMARKETApi();
        } catch (err) {
        dispatch(getMarketFailed());
        }
        dispatch(getMarketAfter());
    }
}
export const deleteMARKET = (idMARKET: any) => {
  return function(dispatch: any) {
    dispatch({type: ACTION_MARKET.DELETE_MARKET, idDelete: idMARKET});
    dispatch(fetchMarket());
  }
}
