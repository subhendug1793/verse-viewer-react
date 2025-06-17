// src/components/Header.jsx
function Header({ visitorCount = 'Loading...', lastUpdated = 'Unknown' }) {
  return (
    <>
      <div className="header-info">
        <span className="last-updated">
          Last updated:{' '}
          <a href="https://docs.google.com/spreadsheets/d/e/2PACX-1vTHaeyqE5JLDS8CaR4X6NoqjdUHpdk0GDI4xUV7qwbmvPFuJRhV1081jxEEM0QBqyFbhyr2Yt" target="_blank" rel="noopener noreferrer">
            {lastUpdated}
          </a>
        </span>
        <span className={`visitor-count ${visitorCount === 'Error' ? 'error' : ''}`}>
          Visitors: {visitorCount}
        </span>
      </div>
      <div className="header-container">
        <img src="/images/sastik_logo.png" alt="SASTIK Logo" className="logo" />
        <h2>
          <a href="https://www.facebook.com/sastikofficial/" target="_blank" rel="noopener noreferrer">
            SASTIK GBQ+
          </a>
        </h2>
      </div>
    </>
  );
}
export default Header;