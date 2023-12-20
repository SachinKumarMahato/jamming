import { useCallback } from "react";
import "./Track.css"

const Track = ({onAdd, track, onRemove, isRemoval}) => {

  const addToTrack = useCallback(() => {
    onAdd(track);

  }, [onAdd, track])

  const removeTrack = useCallback(() =>{
    onRemove(track)
  },[onRemove, track])

  const renderAction = () => {
    if(isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}>-</button>
      );
    }
    return (
      <button className="Track-action" onClick={addToTrack}>+</button>
    )
  }

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>{track.artist} | {track.album}</p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;

