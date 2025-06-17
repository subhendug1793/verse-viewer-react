// src/components/VerseTable.jsx
import { useState, useEffect } from 'react';
import VerseCard from './VerseCard';

function VerseTable() {
  const [sheet, setSheet] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [subCategoryFilter, setSubCategoryFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const sheets = [
    { value: 'gita', label: 'Gita' },
    { value: 'bibleverse', label: 'Bible' },
    { value: 'quran', label: 'Quran' },
    { value: 'hadith', label: 'Hadith' },
    { value: 'miscellaneous', label: 'Miscellaneous' }
  ];

  useEffect(() => {
    if (!sheet) {
      setData([]);
      setFilteredData([]);
      setError('');
      return;
    }
    const loadData = async () => {
      try {
        const response = await fetch(`/data/${sheet.toLowerCase()}.json`);
        if (!response.ok) throw new Error('Failed to load data');
        const jsonData = await response.json();
        setData(jsonData);
        setFilteredData(jsonData);
        setError('');
      } catch (err) {
        setError(`Error loading ${sheet}: ${err.message}`);
        setData([]);
        setFilteredData([]);
      }
    };
    loadData();
  }, [sheet]);

  useEffect(() => {
    let result = [...data];
    if (categoryFilter) {
      result = result.filter(row => row['Verse Category']?.toLowerCase() === categoryFilter.toLowerCase());
    }
    if (subCategoryFilter) {
      result = result.filter(row => row['Sub Category']?.toLowerCase() === subCategoryFilter.toLowerCase());
    }
    if (searchQuery) {
      result = result.filter(row =>
        Object.values(row).some(val =>
          typeof val === 'string' && val.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    setFilteredData(result);
  }, [data, categoryFilter, subCategoryFilter, searchQuery]);

  const categories = [...new Set(data.map(row => row['Verse Category']).filter(Boolean))];
  const subCategories = [...new Set(data.map(row => row['Sub Category']).filter(Boolean))];

  return (
    <div className="verse-table-container">
      {error && <div className="error">{error}</div>}
      <div className="controls">
        <label htmlFor="sheetSelector">Select Gita/Bible/Quran+:</label>
        <select id="sheetSelector" value={sheet} onChange={e => setSheet(e.target.value)}>
          <option value="">Select a sheet</option>
          {sheets.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>
        <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select value={subCategoryFilter} onChange={e => setSubCategoryFilter(e.target.value)}>
          <option value="">All Sub Categories</option>
          {subCategories.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="verse-cards">
        {filteredData.map((row, index) => (
          <VerseCard key={index} row={row} sheet={sheet} index={index} />
        ))}
      </div>
    </div>
  );
}

export default VerseTable;