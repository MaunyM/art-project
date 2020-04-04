import React, {useEffect, useRef, useState} from 'react';
import ArtlineItem from "./ArtlineItem";
import './ArtLine.scss';
import {useDrop} from "react-dnd";

let start = 1800;
let end = 2020;
let duration = end - start;

function Artline({items}) {
  const ref = useRef(null)
  const [itemsWithHeight, setItemsWithHeight] = useState([]);

  const [collectedProps, drop] = useDrop({
    accept: "ART_DRAGGABLE", drop: (item, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const dropTargetXy = ref.current.getBoundingClientRect();
      const yearHeight = ref.current.clientHeight / duration;
      console.log('item', item)
      console.log('monitor', monitor.getSourceClientOffset())
      console.log('pos',
          1800 + ((offset.y - dropTargetXy.top) / yearHeight) + 19)
    }
  })

  useEffect(() => {
    const yearHeight = ref.current.clientHeight / duration;
    const itemWithHeight = [...items].reverse().reduce((acc, item) => [...acc,
          {...item, height: (acc[acc.length - 1].year - item.year) * yearHeight}],
        [{year: end, height: 0}])
    setItemsWithHeight(itemWithHeight.reverse())
  }, [items]);
  return (
      <div ref={drop}>
        <ul className="ant-timeline ArtLine" ref={ref}>

          {itemsWithHeight.map(
              item => <ArtlineItem item={item} key={item.year}/>)}
        </ul>
      </div>

  );
}

export default Artline;
