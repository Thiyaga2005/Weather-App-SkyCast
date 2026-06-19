import { useState } from 'react';
import { useWeather } from '../context/WeatherContext';
import { FiSearch } from 'react-icons/fi';
import { ImSpinner8 } from 'react-icons/im';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { fetchWeather, loading } = useWeather();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      fetchWeather(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <div className="search-wrapper">
        <FiSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for a city... (e.g. London, Mumbai, New York)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
          disabled={loading}
          aria-label="City search input"
        />
        <button
          type="submit"
          className="search-btn"
          disabled={loading || !query.trim()}
          aria-label="Search weather"
        >
          {loading ? <ImSpinner8 className="spin" /> : 'Search'}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
