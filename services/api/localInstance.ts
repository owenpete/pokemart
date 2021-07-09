import axios from 'axios';

const localInstance = axios.create({
  baseURL:'http://localhost:3000/api',
  responseType: 'json'
});

export default localInstance;
