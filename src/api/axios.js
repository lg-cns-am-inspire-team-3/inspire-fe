import axios from 'axios';
import { navigate } from '../router/navigation';
import { getAccessToken, setAccessToken } from '../auth/token';

let isRefreshing = false;
let refreshSubscribers = [];

const api = axios.create({
  // baseURL: 'http://localhost:8080', // 백엔드 주소
  // application/json 고정 삭제
  withCredentials: true
});

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

//
// 요청 인터셉터 → access 자동 첨부
//
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//
// 응답 인터셉터 → 401 처리
//
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    // 이미 refresh 중이면 기다림
    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribeTokenRefresh((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const res = await axios.post(
        "/api/v1/auth/reissue",
        {},
        { withCredentials: true }
      );

      const newToken = res.data.accessToken;

      setAccessToken(newToken);
      onRefreshed(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;

      return api(originalRequest);
    } catch (e) {
      setAccessToken(null);
      navigate("/login");
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;