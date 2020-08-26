import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const getUserApi = () => {
  return callApiAxios('/users', 'GET')
}
export const getDetailUserAPI = (idUser: string) => {
  return callApiAxios(`/user/${idUser}`, 'GET')
}
