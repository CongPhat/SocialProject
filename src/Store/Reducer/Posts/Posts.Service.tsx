import { callApiAxios } from '@Server/ApiCaller'
export const getAll = (): Promise<any> => {
  return callApiAxios(`/post`, 'GET')
}
