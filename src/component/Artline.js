import React, {useEffect, useRef, useState} from 'react';
import ArtlineItem from "./ArtlineItem";
import './ArtLine.scss';

let start = 1800;
let end = 1900;
let duration = end - start;

function Artline({items}) {
  const ref = useRef(null)
  const [itemsWithHeight, setItemsWithHeight] = useState([]);

  useEffect(() => {
    const yearHeight = ref.current.clientHeight / duration;
    const itemWithHeight = [...items].reverse().reduce((acc, item) => [...acc,
          {...item, height: (acc[acc.length - 1].year - item.year) * yearHeight}],
        [{year: 1900, height: 0}])
    setItemsWithHeight(itemWithHeight.reverse())
  }, [items]);
  return (
      <ul className="ant-timeline ArtLine" ref={ref}>
        {itemsWithHeight.map(
            item => <ArtlineItem item={item} key={item.year}/>)}
      </ul>
  );
}

export default Artline;
