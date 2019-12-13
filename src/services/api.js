import axios from 'axios';
import { getToken } from './auth';

const api = axios.create({
  baseURL: 'http://10.10.57.251:3333',
});

api.interceptors.request.use(async config => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
