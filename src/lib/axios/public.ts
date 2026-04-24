import axios from 'axios';

export const publicApi = axios.create({
  baseURL: '',
  headers: { 'Content-Type': 'application/json' },
});
