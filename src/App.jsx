// // App.js (Root Component)
// import { useCallback, useState } from "react";
// import Playlist from "./components/Playlist/Playlist";
// import SearchBar from "./components/Searchbar/Searchbar";
// import SearchResult from "./components/SearchResults/SearchResults";
// import Spotify from "./util/Spotify";
import { useEffect, useState } from "react";
import "./App.css";
import Spotify from "./util/Spotify";

const App = () => {
  // State to manage playlist information
  // const [searchResults, setSearchResults] = useState([]);
  // const [playlistName, setPlaylistName] = useState("");
  // const [playlistTracks, setPlaylistTracks] = useState([]);

  // const search = useCallback((term) => {
  //   Spotify.search(term).then(setSearchResults);
  // }, []);

  // const addTrack = useCallback((track) => {
  //     if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
  //       return;
  //     setPlaylistTracks((prevTrack) => [...prevTrack, track]);
  //   },[playlistTracks]
  // );

  // const removeTrack = useCallback((track) => {
  //   setPlaylistTracks((prevTrack) =>
  //     prevTrack.filter((currentTrack) => currentTrack.id !== track.id)
  //   );
  // }, []);

  // const updatePlaylistName = useCallback((name) => {
  //   setPlaylistName(name);
  // }, []);

  // const savePlaylist = useCallback(() => {
  //   const trackUris = playlistTracks.map((track) => track.uri);
  //   Spotify.savePlaylist(playlistName, trackUris).then(() => {
  //     setPlaylistName("New Playlist");
  //   });
  // }, [playlistName, playlistTracks]);
  const [accessToken, setAccessToken] = useState("");
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    setAccessToken(Spotify.getAccessToken());
  }, []);

  const search = async () => {
    // console.log("token", searchInput);
    const url = `https://api.spotify.com/v1/search?type=track&q=${searchInput}`
    const artistParameters = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    }
    const response = await fetch(url, artistParameters)
    const data = await response.json()
    console.log(data)
  };
  return (
    <div>
      <h1>Jammming App</h1>
      <div >
          <input type="text"
          className="border border-red-800"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          />
          <button onClick={search}>search</button>
      </div>
    </div>
  );
};

export default App;
