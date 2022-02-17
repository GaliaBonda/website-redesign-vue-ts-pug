import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://morning-grass-49.getsandbox.com',
});

instance.interceptors.response.use((res) => res.data);

export default instance;
