import axios from 'axios';

export const fetchFromApi = axios.create({
  baseURL: 'http://localhost:3333',
});