// src/utils/authAxios.js
import axios from 'axios';

const authAxios = axios.create();

// Helper to check if token is expired
function isTokenExpired() {
  const expiresIn = parseInt(localStorage.getItem('expires_in'), 10);
  const timestamp = parseInt(localStorage.getItem('token_timestamp'), 10);
  const now = Date.now();

  return now - timestamp >= expiresIn * 1000;
}

// Refresh token logic
async function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await axios.post('/api/login', {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  }, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const { data } = response.data;
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('expires_in', data.expires_in);
  localStorage.setItem('token_timestamp', Date.now());
}

// Request interceptor
authAxios.interceptors.request.use(async (config) => {
  if (isTokenExpired()) {
    await refreshToken();
  }npm

  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => Promise.reject(error));

export default authAxios;
