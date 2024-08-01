// client/src/api/adminMetricsApi.js
import axios from 'axios';

export const getMetrics = async () => {
  try {
    const response = await axios.get('http://localhost:555/api/metrics');
    return response.data;
  } catch (error) {
    console.error('Error fetching metrics data:', error);
    throw error;
  }
};