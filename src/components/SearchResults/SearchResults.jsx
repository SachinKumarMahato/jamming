// SearchResult.js (Child Component)
import TrackList from '../../components/Tracklist/Tracklist';
import "./SearchResult.css"
const SearchResult = ({ onAdd, searchResults }) => {

  return (
    <div className='SearchResult'>
      <h2> Results</h2>
      <TrackList
        tracks={searchResults}
        onAdd={onAdd} 
        
      />
    </div>
  );
};

export default SearchResult;


