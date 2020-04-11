import React, {useEffect, useRef, useState} from 'react';
import ArtlineItem from "./ArtlineItem";
import './ArtLine.scss';

let start = 1400;
let end = 2020;
let duration = end - start;

function Artline({items, onDrop}) {
  const ref = useRef(null)
  const [itemsWithHeight, setItemsWithHeight] = useState([]);

  useEffect(() => {
    const yearHeight = ref.current.clientHeight / duration;
    const itemWithHeight = [...items].sort(
        (a, b) => a.year - b.year).reverse().reduce((acc, item) => {
          const nextItemYear = acc[acc.length - 1].year;
          return [...acc,
            {
              ...item,
              height: (nextItemYear - item.year) * yearHeight,
              nextItemYear
            }
          ]
        },
        [{year: end, height: 0}]
    )
    setItemsWithHeight(itemWithHeight.reverse())
  }, [items]);
  return (

      <ul className="ant-timeline ArtLine" ref={ref}>

        {itemsWithHeight.map(
            item => <ArtlineItem item={item} key={item.year}
                                 onDrop={onDrop}/>)}
      </ul>

  );
}

export default Artline;
