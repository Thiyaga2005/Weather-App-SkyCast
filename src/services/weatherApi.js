// src/services/weatherApi.js
import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

export const getCurrentWeather = async (city) => {
  const response = await api.get('/weather', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getForecast = async (city) => {
  const response = await api.get('/forecast', {
    params: {
      q: city,
      appid: API_KEY,
      units: 'metric',
    },
  });
  return response.data;
};

export const getAirQuality = async (lat, lon) => {
  const response = await api.get('/air_pollution', {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
  return response.data;
};

export const getUVIndex = async (lat, lon) => {
  const response = await api.get('/uvi', {
    params: {
      lat,
      lon,
      appid: API_KEY,
    },
  });
  return response.data;
};
