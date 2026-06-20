import { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { WiDayCloudy } from 'react-icons/wi';

const Navbar = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('skycast-theme') || 'dark';
  });

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('skycast-theme', theme);
  }, [theme]);

  return (
    <nav className="navbar glass">
      <div className="navbar-brand">
        <WiDayCloudy className="brand-icon" />
        <h1 className="brand-name">SkyCast</h1>
      </div>
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="theme-btn"
        aria-label="Toggle theme"
        id="theme-toggle"
      >
        {theme === 'dark'
          ? <FaSun className="icon-sun" />
          : <FaMoon className="icon-moon" />}
        <span className="theme-label">{theme === 'dark' ? 'Light' : 'Dark'}</span>
      </button>
    </nav>
  );
};

export default Navbar;
