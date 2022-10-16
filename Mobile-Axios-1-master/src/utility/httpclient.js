import axios from 'axios';
import { getAuthToken, getUserData, removeAuthToken } from './token.utils';

const Axios = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Change request data/error here
Axios.interceptors.request.use(
  (config) => {
    // const token = getAuthToken();
    // if(token){
    //     config.headers = {
    //         ...config.headers,
    //         access_token: `${token ? token : ''}`,
    //       };
    // }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      (error.response && error.response.status === 401) ||
      (error.response && error.response.status === 403) ||
      (error.response &&
        error.response.data.message === 'PIXER_ERROR.NOT_AUTHORIZED')
    ) {
      removeAuthToken();
    //   Router.reload();
    }
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get(url, params={}) {
    const response = await Axios.get(url, { params });
    return response.data;
  }

  static async post(url, data, options={}) {
    const token = getAuthToken(); 
    const user = getUserData()
    // getAuthToken();
    if(token){
        data = {
            ...data,
            access_token: `${token ? token : ''}`,
            user_id:user.user_id
          };
    }
    const response = await Axios.post(url, data, options);
    return response.data;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response.data;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response.data;
  }

  static formatSearchParams(params) {
    return Object.entries(params)
      .filter(([, value]) => Boolean(value))
      .map(([k, v]) =>
        ['type', 'categories', 'tags', 'author', 'manufacturer'].includes(k)
          ? `${k}.slug:${v}`
          : `${k}:${v}`
      )
      .join(';');
  }
}
