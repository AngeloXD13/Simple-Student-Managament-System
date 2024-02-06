import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5001', // Set your API base URL
  timeout: 5000, // Set your preferred timeout
  // Add any other Axios configuration options here
});

export default instance;