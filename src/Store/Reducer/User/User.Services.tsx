import axios from 'axios'
import { callApiAxios } from '@Server/ApiCaller'

export const getUserApi = () => {
  return callApiAxios('/users', 'GET')
}
export const getDetailUserAPI = (idUser: string) => {
  return callApiAxios(`/user/${idUser}`, 'GET')
}
export const addFriendAPI = (idFriend: string) => {
  return callApiAxios(`/user/friend/${idFriend}`, 'GET')
}
export const addFriendSuccessAPI = (idFriend: string) => {
  return callApiAxios(`/user/friend-success/${idFriend}`, 'GET')
}
export const closeFriendAPI = (idFriend: string) => {
  return callApiAxios(`/user/close-friend/${idFriend}`, 'GET')
}
