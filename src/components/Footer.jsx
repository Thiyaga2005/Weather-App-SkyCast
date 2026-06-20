const Footer = () => {
  return (
    <footer className="footer">
      Powered by{' '}
      <a href="https://open-meteo.com/" target="_blank" rel="noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>
        Open-Meteo
      </a>
      {' '}· © 2026 SkyCast
    </footer>
  );
};

export default Footer;
