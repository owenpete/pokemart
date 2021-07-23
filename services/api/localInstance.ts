import axios from 'axios';

const localInstance = axios.create({
  baseURL:`${process.env.NEXT_PUBLIC_BASE_URL}/api`,
  responseType: 'json'
});

export default localInstance;
