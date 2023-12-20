import Track from "../Track/Track";
import "./Tracklist.css";
const Tracklist = ({ tracks, onAdd, isRemoval, removeTrack }) => {
  return (
    <div className="Tracklist">
      {tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={onAdd}
            isRemoval={isRemoval}
            onRemove={removeTrack}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
