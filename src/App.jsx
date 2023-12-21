// App.js (Root Component)
import { useCallback, useState } from "react";
import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/Searchbar/Searchbar";
import SearchResult from "./components/SearchResults/SearchResults";
import Spotify from "./util/Spotify";
import "./App.css";

const App = () => {
  // State to manage playlist information
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
      if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
        return;
      setPlaylistTracks((prevTrack) => [...prevTrack, track]);
    },[playlistTracks]
  );

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTrack) =>
      prevTrack.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
    });
  }, [playlistName, playlistTracks]);

  return (
    <div>
      <h1 className="highlight">Jammming App</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResult searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            name={playlistName}
            tracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemoveTrack={removeTrack}
            onSave={savePlaylist}
            onAdd={addTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
