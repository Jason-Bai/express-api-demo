import axios from 'axios'
import { getToken } from './auth';

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API || '/', // api的base_url
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
  err => {
    return Promise.reject(err);
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
          /*
          router.replace({
            path: 'login'
            //query: {redirect: router.currentRoute.fullPath}
          })
          */
          break;
        default:
          if (console && console.error) {
            console.error(401);
          }
          break;
      }
    }
    return Promise.reject(error.response.data)
  });

export default service;
