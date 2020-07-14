import axios from 'axios';
import {callApiAxios} from '@Server/ApiCaller';

export const getUserApi = () => {
  return callApiAxios('/users', 'GET');
}
