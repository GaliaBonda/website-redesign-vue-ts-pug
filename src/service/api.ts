import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://morning-grass-49.getsandbox.com:443',
});

instance.interceptors.response.use((res) => res.data);

export default instance;
