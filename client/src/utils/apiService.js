import axios from 'axios';

const config = {
  baseURL: '/api/v1', // Base URL for API
  timeout: 10000, // Timeout for requests
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiFetch = axios.create(config);

export default apiFetch;
