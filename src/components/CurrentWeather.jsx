import { useWeather } from '../context/WeatherContext';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer } from 'react-icons/wi';
import { FiEye } from 'react-icons/fi';

// WMO weather interpretation codes → description + emoji
const getWeatherInfo = (code) => {
  const map = {
    0:  { desc: 'Clear Sky', emoji: '☀️' },
    1:  { desc: 'Mainly Clear', emoji: '🌤️' },
    2:  { desc: 'Partly Cloudy', emoji: '⛅' },
    3:  { desc: 'Overcast', emoji: '☁️' },
    45: { desc: 'Foggy', emoji: '🌫️' },
    48: { desc: 'Icy Fog', emoji: '🌫️' },
    51: { desc: 'Light Drizzle', emoji: '🌦️' },
    53: { desc: 'Drizzle', emoji: '🌦️' },
    55: { desc: 'Heavy Drizzle', emoji: '🌧️' },
    61: { desc: 'Slight Rain', emoji: '🌧️' },
    63: { desc: 'Moderate Rain', emoji: '🌧️' },
    65: { desc: 'Heavy Rain', emoji: '🌧️' },
    71: { desc: 'Slight Snow', emoji: '🌨️' },
    73: { desc: 'Moderate Snow', emoji: '❄️' },
    75: { desc: 'Heavy Snow', emoji: '❄️' },
    80: { desc: 'Rain Showers', emoji: '🌦️' },
    81: { desc: 'Rain Showers', emoji: '🌧️' },
    82: { desc: 'Violent Showers', emoji: '⛈️' },
    85: { desc: 'Snow Showers', emoji: '🌨️' },
    95: { desc: 'Thunderstorm', emoji: '⛈️' },
    96: { desc: 'Thunderstorm w/ Hail', emoji: '⛈️' },
    99: { desc: 'Thunderstorm w/ Heavy Hail', emoji: '⛈️' },
  };
  return map[code] ?? { desc: 'Unknown', emoji: '🌡️' };
};

const getWindDirection = (deg) => {
  const dirs = ['N','NE','E','SE','S','SW','W','NW'];
  return dirs[Math.round(deg / 45) % 8];
};

const CurrentWeather = () => {
  const { city, weather, loading, error } = useWeather();

  if (loading) {
    return (
      <section className="glass card fade-in loading-card">
        <div className="loader-ring" />
        <p className="loading-text">Fetching weather data...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="glass card fade-in error-card">
        <span className="error-emoji">⚠️</span>
        <p className="error-text">{error}</p>
      </section>
    );
  }

  if (!weather) {
    return (
      <section className="glass card fade-in empty-card">
        <p className="empty-emoji">🔍</p>
        <p className="empty-title">Search for a city to see weather</p>
        <p className="empty-sub">Try typing "London", "Tokyo", or "New York"</p>
      </section>
    );
  }

  const { desc, emoji } = getWeatherInfo(weather.weather_code);
  const windDir = getWindDirection(weather.wind_direction_10m);
  const visibilityKm = weather.visibility != null ? (weather.visibility / 1000).toFixed(1) : '--';

  return (
    <section className="glass card fade-in current-weather">
      <div className="cw-header">
        <div>
          <h2 className="city-name">{city}</h2>
          <p className="condition-label">{desc}</p>
        </div>
        <div className="weather-emoji">{emoji}</div>
      </div>

      <div className="temp-row">
        <span className="temp-main">{Math.round(weather.temperature_2m)}°C</span>
        <span className="temp-feels">Feels like {Math.round(weather.apparent_temperature)}°C</span>
      </div>

      <div className="stats-grid">
        <div className="stat-item">
          <WiHumidity className="stat-icon blue" />
          <span className="stat-value">{weather.relative_humidity_2m}%</span>
          <span className="stat-label">Humidity</span>
        </div>
        <div className="stat-item">
          <WiStrongWind className="stat-icon teal" />
          <span className="stat-value">{weather.wind_speed_10m} km/h {windDir}</span>
          <span className="stat-label">Wind</span>
        </div>
        <div className="stat-item">
          <WiBarometer className="stat-icon purple" />
          <span className="stat-value">{weather.surface_pressure?.toFixed(0)} hPa</span>
          <span className="stat-label">Pressure</span>
        </div>
        <div className="stat-item">
          <FiEye className="stat-icon orange" />
          <span className="stat-value">{visibilityKm} km</span>
          <span className="stat-label">Visibility</span>
        </div>
      </div>
    </section>
  );
};

export default CurrentWeather;
