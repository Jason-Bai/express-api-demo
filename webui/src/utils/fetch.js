import axios from 'axios'
import { getToken } from './auth';
import { getError } from './error';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API || '/api_v1', // api的base_url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// http response 拦截器
service.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          if (console && console.error) {
            console.error(401);
          }
          break;
        default:
          if (console && console.error) {
            console.error('default');
          }
          break;
      }
    }
    const err = getError(error);
    return Promise.reject(err);
  });

export default service;
