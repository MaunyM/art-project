import React from 'react';
import './ArtDraggable.scss';
import {useDrag} from 'react-dnd'

function ArtDraggable({item}) {
  const [collectedProps, drag] = useDrag({
    item: {id: "ART_DRAGGABLE", type: "ART_DRAGGABLE"},
  })
  return (
      <div className={'ArtDraggable'}>
        {item &&
        <div>
          {item.preview && <img alt={item.title}
                                src={item.preview} ref={drag}/>
          }
          <span className={'title'}>{item.title}</span>
        </div>}
      </div>
  );
}

export default ArtDraggable;
