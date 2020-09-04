import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const loginAPI = (data?: any) => {
  return callApiAxios('/user/login', 'POST', data)
}
