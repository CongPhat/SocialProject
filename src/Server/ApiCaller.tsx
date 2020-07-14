import axios from "axios";
import { BASE_URL } from "../config/path";

export function callApiAxios(endpoint: any, method?: string, body?: any, header?: any): Promise<any> {
  switch (method) {
    case "GET": {
      return axios.get(`${BASE_URL}${endpoint}`);
    }
    case "POST": {
      return axios.post(`${BASE_URL}${endpoint}`, body, header);
    }
    case "DELETE": {
      return axios.delete(`${BASE_URL}${endpoint}`, body);
    }
    case "PUT": {
      return axios.put(`${BASE_URL}${endpoint}`, body);
    }
    default: {
      return axios.get(`${BASE_URL}${endpoint}`);
    }
  }
}
