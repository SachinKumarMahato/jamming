import { useCallback } from "react";
import TrackList from "./TrackList";

function Playlist(props) {
  return (
    <div>
      <input defaultValue={"New Playlist"} />
      <TrackList
      tracks={props.playlistTracks}
      isRemoval={true}
      onRemove={props.onRemove}
      />
      <button onClick={props.onSave}>save to sportify</button>
    </div>
  )
}