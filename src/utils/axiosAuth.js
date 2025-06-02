// src/utils/authAxios.js
import axios from 'axios';

const authAxios = axios.create();

const client_id = 'xyz';
const client_secret = 'xyz';

function isTokenExpired() {
  const expiresIn = parseInt(localStorage.getItem('expires_in'), 10);
  const timestamp = parseInt(localStorage.getItem('token_timestamp'), 10);
  const now = Date.now();
  return now - timestamp >= expiresIn * 1000;
}

async function refreshToken() {
  const refresh_token = localStorage.getItem('refresh_token');
  if (!refresh_token) throw new Error('No refresh token available');

  const params = new URLSearchParams();
  params.append('client_id', client_id);
  params.append('client_secret', client_secret);
  params.append('grant_type', 'refresh_token');
  params.append('refresh_token', refresh_token);

  const response = await axios.post('/api/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });

  const data = response.data.data;
  localStorage.setItem('access_token', data.access_token);
  localStorage.setItem('refresh_token', data.refresh_token);
  localStorage.setItem('expires_in', data.expires_in);
  localStorage.setItem('token_timestamp', Date.now());
}

// Request interceptor
authAxios.interceptors.request.use(async (config) => {
  try {
    if (isTokenExpired()) {
      await refreshToken();
    }
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (err) {
    console.error('Token refresh failed:', err);
  }
  return config;
}, (error) => Promise.reject(error));

export default authAxios;
