import TrackList from './TrackList'
function SearchResult (props) {
  return (
    <div>
      <h2>Result</h2>
    <TrackList tracks={props.SearchResult}/>
    </div>
  )
}

export default SearchResult