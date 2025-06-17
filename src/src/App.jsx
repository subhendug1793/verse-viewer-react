// src/App.jsx
import './assets/style.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VerseTable from './components/VerseTable';

function App() {
  const [visitorCount, setVisitorCount] = useState('Loading...');
  const lastUpdated = 'June 2025'; // Update as needed

  useEffect(() => {
    // Placeholder for Firebase visitor count (added in Step 5)
    setVisitorCount('N/A'); // Temporary
  }, []);

  return (
    <Router>
      <div className="app">
        <Header visitorCount={visitorCount} lastUpdated={lastUpdated} />
        <Routes>
          <Route path="/" element={<VerseTable />} />
          <Route path="/verse-viewer-react" element={<VerseTable />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;