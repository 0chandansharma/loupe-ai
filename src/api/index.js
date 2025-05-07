// src/api/index.js - Updated with mock base URL
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Since we're using mock data, the API URL won't be used,
// but it's good to have it configured for when your API is ready
const API_BASE_URL = 'https://your-api-endpoint.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

// Add authorization header with JWT token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    } catch (error) {
      console.error('Auth token error:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // For testing purposes, log the error but don't reject the promise
    // This allows our mock data fallback to work
    console.error('API Error:', error.message || 'Unknown error');
    
    if (error.message === 'Network Error') {
      console.log('Network error - Check your internet connection');
    }
    
    // Let the error propagate to be handled by the specific API function
    return Promise.reject(error);
  }
);

export default api;