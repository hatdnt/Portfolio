// webjasa/client/src/api/googleAnalyticsApi.js
import axios from 'axios';

export const fetchGoogleAnalyticsData = async () => {
  try {
    const response = await axios.get('http://localhost:555/api/google-analytics-data');
    console.log('Received data:', response.data); // Tambahkan logging di sini
    return response.data;
  } catch (error) {
    console.error('Error fetching Google Analytics data:', error);
    throw error;
  }
};