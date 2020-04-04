import React from 'react';
import './ArtDraggable.scss';
import {useDrag} from 'react-dnd'

function ArtDraggable() {
  const [collectedProps, drag] = useDrag({
    item: {id: "ART_DRAGGABLE", type: "ART_DRAGGABLE"},
  })
  return (
      <div className={'ArtDraggable'} ref={drag}>
      </div>
  );
}

export default ArtDraggable;
