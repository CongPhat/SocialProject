import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const loadMessageAPI = (id: string) => {
  return callApiAxios(`/message/${id}`, 'GET')
}

export const loadMessageAPIGraphql = (body: any) => {
  return callApiAxios(`/graphql`, 'GET', body)
}
