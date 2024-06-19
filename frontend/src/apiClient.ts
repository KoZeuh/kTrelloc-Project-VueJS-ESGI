import axios from 'axios';
import router from '@/router';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem('token');
      router.push({ name: 'Home' });
    }
    return Promise.reject(error);
  }
);

export default apiClient;
