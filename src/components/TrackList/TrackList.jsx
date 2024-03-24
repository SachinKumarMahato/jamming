import Track from "../../components/Track/Track";
import "./Tracklist.css";
const Tracklist = ({ tracks, onAdd, isRemoval, onRemove}) => {
  return (
    <div className="Tracklist">
      {tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            onAdd={onAdd}
            isRemoval={isRemoval}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
};

export default Tracklist;
