import React, {useRef} from 'react';
import './ArtLineItem.scss';
import {useDrop} from "react-dnd";

function ArtlineItem({item, onDrop}) {
  const ref = useRef(null)

  const [collectedProps, drop] = useDrop({
    accept: "ART_DRAGGABLE", drop: (otherItem, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const dropTargetXy = ref.current.getBoundingClientRect();
      const timeBeforeNext = item.nextItemYear - item.year;
      const yearHeight = ref.current.clientHeight / timeBeforeNext;
      onDrop(
          Math.floor(+item.year + ((offset.y - dropTargetXy.top) / yearHeight)))
    }
  })

  return (
      <li
          style={{height: `${item.height}px`}}
          ref={drop}
      >
        <div className="ant-timeline-item ArtlineItem" ref={ref}>
          <div className="ant-timeline-item-tail"/>
          <div
              className="ant-timeline-item-head ant-timeline-item-head-blue"/>
          <div className="ant-timeline-item-content">
            <div className={'main'}>
              <div>
                <span className={'year'}>{item.year}</span>

              </div>
              <div className={'second'}>
                <span className={'title'}>{item.title}</span>
                <span className={'artist'}>{item.artist}</span>
              </div>
            </div>
            {item.preview && <img alt={item.title}
                                  src={item.preview}/>
            }
          </div>
        </div>
      </li>
  );
}

export default ArtlineItem;
