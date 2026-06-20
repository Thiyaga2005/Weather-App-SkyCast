import { createContext, useContext, useState } from 'react';

const WeatherContext = createContext(null);

export const useWeather = () => useContext(WeatherContext);

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    setWeather(null);
    setForecast(null);

    try {
      // Step 1: Geocode city name to lat/lon using Open-Meteo geocoding API
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`City "${cityName}" not found. Please try another name.`);
      }

      const { latitude, longitude, name, country, timezone } = geoData.results[0];

      // Step 2: Fetch current weather + 7-day forecast from Open-Meteo
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max` +
        `&timezone=${encodeURIComponent(timezone)}&forecast_days=7`
      );
      const weatherData = await weatherRes.json();

      setCity(`${name}, ${country}`);
      setWeather({ ...weatherData.current, timezone, latitude, longitude });
      setForecast(weatherData.daily);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <WeatherContext.Provider value={{ city, weather, forecast, loading, error, fetchWeather }}>
      {children}
    </WeatherContext.Provider>
  );
};
