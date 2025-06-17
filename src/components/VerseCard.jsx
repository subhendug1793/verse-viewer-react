// src/components/VerseCard.jsx
import { Link } from 'react-router-dom';

function VerseCard({ row, sheet, index }) {
  const verseName = row['Verse Name'] || row['Verse'] || `Verse ${index + 1}`;
  return (
    <div className="verse-card-minimal">
      <h3>{verseName}</h3>
      <div className={`category ${row['Verse Category']?.toLowerCase().replace(/ /g, '-')}`}>
        {row['Verse Category'] || 'N/A'}
      </div>
      <p className="sub-category">{row['Sub Category'] || 'N/A'}</p>
      <p className="verse-text">{row['Verse'] || row['Text'] || 'No text available'}</p>
      <div className="card-actions">
        <Link to={`/verse/${sheet}/${index}`} className="view-btn">View Full Verse</Link>
        <button className="share-btn" onClick={() => alert('Share clicked')}>Share</button>
      </div>
    </div>
  );
}
export default VerseCard;