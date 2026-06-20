import { useWeather } from '../context/WeatherContext';

const getWeatherInfo = (code) => {
  const map = {
    0:  { desc: 'Clear', emoji: '☀️' },
    1:  { desc: 'Mainly Clear', emoji: '🌤️' },
    2:  { desc: 'Partly Cloudy', emoji: '⛅' },
    3:  { desc: 'Overcast', emoji: '☁️' },
    45: { desc: 'Foggy', emoji: '🌫️' },
    48: { desc: 'Icy Fog', emoji: '🌫️' },
    51: { desc: 'Light Drizzle', emoji: '🌦️' },
    53: { desc: 'Drizzle', emoji: '🌦️' },
    55: { desc: 'Heavy Drizzle', emoji: '🌧️' },
    61: { desc: 'Slight Rain', emoji: '🌧️' },
    63: { desc: 'Rain', emoji: '🌧️' },
    65: { desc: 'Heavy Rain', emoji: '🌧️' },
    71: { desc: 'Light Snow', emoji: '🌨️' },
    73: { desc: 'Snow', emoji: '❄️' },
    75: { desc: 'Heavy Snow', emoji: '❄️' },
    80: { desc: 'Showers', emoji: '🌦️' },
    81: { desc: 'Showers', emoji: '🌧️' },
    82: { desc: 'Violent Showers', emoji: '⛈️' },
    85: { desc: 'Snow Showers', emoji: '🌨️' },
    95: { desc: 'Thunderstorm', emoji: '⛈️' },
    96: { desc: 'Thunderstorm', emoji: '⛈️' },
    99: { desc: 'Thunderstorm', emoji: '⛈️' },
  };
  return map[code] ?? { desc: 'Unknown', emoji: '🌡️' };
};

const getDayName = (dateStr, idx) => {
  if (idx === 0) return 'Today';
  if (idx === 1) return 'Tomorrow';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const Forecast = () => {
  const { forecast, weather, loading } = useWeather();

  if (loading || !forecast) return null;

  return (
    <section className="glass card fade-in forecast-section">
      <h2 className="section-title">7-Day Forecast</h2>
      <div className="forecast-grid">
        {forecast.time.map((date, idx) => {
          const { desc, emoji } = getWeatherInfo(forecast.weather_code[idx]);
          const maxT = Math.round(forecast.temperature_2m_max[idx]);
          const minT = Math.round(forecast.temperature_2m_min[idx]);
          const precip = forecast.precipitation_probability_max[idx];
          const wind = Math.round(forecast.wind_speed_10m_max[idx]);

          return (
            <div key={date} className={`forecast-card ${idx === 0 ? 'today' : ''}`}>
              <p className="forecast-day">{getDayName(date, idx)}</p>
              <p className="forecast-emoji">{emoji}</p>
              <p className="forecast-desc">{desc}</p>
              <div className="forecast-temps">
                <span className="temp-high">{maxT}°</span>
                <span className="temp-divider">/</span>
                <span className="temp-low">{minT}°</span>
              </div>
              <div className="forecast-extras">
                <span title="Rain probability">💧 {precip}%</span>
                <span title="Max wind">💨 {wind}km/h</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Forecast;
