import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getInventory = async () => {
  const response = await api.get('/inventory');
  return response.data;
};

export const getAlerts = async () => {
  const response = await api.get('/alerts');
  return response.data;
};

export const uploadInventory = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  const response = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const clearInventory = async () => {
  const response = await api.post('/clear');
  return response.data;
};

export default api;
