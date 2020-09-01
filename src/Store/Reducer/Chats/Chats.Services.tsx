import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const loadMessageAPI = (id: string) => {
  return callApiAxios(`/message/${id}`, 'GET')
}
