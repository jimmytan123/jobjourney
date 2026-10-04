import axios from 'axios';

const config = {
  baseURL: '/api/v1', // Base URL for API(note: the proxy was set in the vite.config.js file)
  timeout: 10000, // Timeout for requests
};

const baseFetch = axios.create(config);

export default baseFetch;
