import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // API의 기본 URL
  headers: {
    'Content-Type': 'application/json',
    // 필요한 경우 다른 헤더 추가
  },
});

export default axiosInstance;