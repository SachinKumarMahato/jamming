// SearchResult.js (Child Component)
import TrackList from '../../components/Tracklist/Tracklist';
import "./SearchResult.css"
const SearchResult = ({ addTrack, searchResults }) => {

  return (
    <div className='SearchResult'>
      <h2> Results</h2>
      <TrackList
        tracks={searchResults}
        onAdd={addTrack} 
        
      />
    </div>
  );
};

export default SearchResult;


