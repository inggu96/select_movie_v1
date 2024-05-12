import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.API_URL,
  timeout: 5_000,
});
apiClient.interceptors.request.use(async (config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.data?.message === 'TOKEN_EXPIRED'
    ) {
      const refreshToken = localStorage.getItem('refresh_token');
      const accessToken = localStorage.getItem('access_token');
      const response = await axios.post(`${config.API_URL}/auth/refresh`, {
        refreshToken,
        accessToken,
      });
      if (response.data) {
        const { accessToken, refreshToken } = response.data;
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);

        return await apiClient(error.config);
      } else {
        localStorage.clear();
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
