import { PROXY_URL } from './constants.js';

export const getCoordinates = async (cityName) => {
  const response = await axios.get(`${PROXY_URL}/location`, {
    params: { q: cityName },
  });
  if (!Array.isArray(response.data) || response.data.length === 0) {
    throw new Error(`LocationIQ error: ${response.data.error || 'City not found'}`);
  }
  const { lat, lon } = response.data[0];
  return { lat, lon };
};

export const getWeather = async ({ lat, lon }) => {
  const response = await axios.get(`${PROXY_URL}/weather`, {
    params: { lat, lon },
  });
  if (!response.data.main) {
    throw new Error(`OpenWeather error: ${response.data.message}`);
  }
  return response.data.main.temp;
};
