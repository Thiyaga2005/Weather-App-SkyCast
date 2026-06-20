import { WeatherProvider } from './context/WeatherContext';
import Navbar from './components/Navbar.jsx';
import SearchBar from './components/SearchBar.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import Forecast from './components/Forecast.jsx';
import Footer from './components/Footer.jsx';
import './index.css';

function App() {
  return (
    <WeatherProvider>
      <div className="app-root">
        <div className="bg-orbs">
          <div className="orb orb1" />
          <div className="orb orb2" />
          <div className="orb orb3" />
        </div>
        <Navbar />
        <main className="main-content">
          <SearchBar />
          <CurrentWeather />
          <Forecast />
        </main>
        <Footer />
      </div>
    </WeatherProvider>
  );
}

export default App;
