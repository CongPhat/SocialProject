import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const searchAPI = (data?: any) => {
  return callApiAxios('/user/search', 'POST', data)
}
