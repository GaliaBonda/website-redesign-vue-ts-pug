import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: 'https://morning-grass-49.getsandbox.com',
});

instance.interceptors.response.use((res) => res.data);

const ApiService = {
  get(resourse: string, config?: AxiosRequestConfig) {
    return instance.get(resourse, config);
  },
  post(resourse: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.post(resourse, data, config);
  },
  put(resourse: string, data?: unknown, config?: AxiosRequestConfig) {
    return instance.put(resourse, data, config);
  },
  delete(resourse: string, config?: AxiosRequestConfig) {
    return instance.delete(resourse, config);
  },
};

export default ApiService;
