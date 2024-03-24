// Playlist.js (Child Component)
import { useCallback } from "react";
import TrackList from "../../components/Tracklist/Tracklist";
import "./Playlist.css";

const Playlist = ({ onNameChange, tracks, onRemoveTrack, onSave }) => {
  const handleNameChange = useCallback(
    (event) => onNameChange(event.target.value),
    [onNameChange]
  );

  return (
    <div className="Playlist">
      <input onChange={handleNameChange} defaultValue={"New Playlist"} />
      <TrackList tracks={tracks} isRemoval={true} onRemove={onRemoveTrack} />
      <button onClick={onSave}>SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;
