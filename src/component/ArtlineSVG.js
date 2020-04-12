import React, {useEffect, useRef, useState} from 'react';
import './ArtlineSVG.scss';
import {useDrop} from "react-dnd";
import {
  buildTick,
  positionToYear,
  yearInPixel,
  yearToPosition
} from "../service/service";

function ArtlineSvg({items, onDrop, conf}) {

  const ref = useRef(null)
  const years = buildTick(conf.startYear);
  const [overYear, setOverYear] = useState(0);
  const [selectedBar, setSelectedBar] = useState({});
  const [overVisible, setOverVisible] = useState(false);

  const [collectedProps, drop] = useDrop({
    accept: "ART_DRAGGABLE", drop: (otherItem, monitor) => {
      const offset = monitor.getSourceClientOffset();
      const dropTargetXy = ref.current.getBoundingClientRect();
      const timeBeforeNext = 620;
      const yearHeight = 2000 / timeBeforeNext;
      console.log('offset', offset.y)
      console.log('dropTargetXy', dropTargetXy)
      console.log('clientHeight', ref.current.clientHeight)
      console.log('yearHeight', yearHeight)
      console.log(
          Math.floor(+1400 + ((offset.y - dropTargetXy.top) / yearHeight)))
    }
  })

  useEffect(() => {
    setSelectedBar(
        {...conf.selectBar, height: conf.yearMarginError * yearInPixel(conf)})
  }, [conf])

  function handleMouserMove(event) {
    if (overVisible) {
      const offSetY = event.clientY - ref.current.getBoundingClientRect().top
      setOverYear(positionToYear(offSetY, conf))
    }
  }

  return (
      <svg ref={drop} height={conf.height} className={'ArtlineSVG'}
           onMouseMove={handleMouserMove}
           onMouseEnter={() => setOverVisible(true)}
           onMouseLeave={() => setOverVisible(false)}
           onClick={e => onDrop(overYear)}>
        <defs xmlns="http://www.w3.org/2000/svg">
          <filter id="dropshadow" height="130%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="2" dy="2" result="offsetblur"/>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <line x1={conf.padding} y1="0" x2={conf.padding} y2="2000"
              className={'item-tail'} ref={ref}/>
        {overVisible && <g
            transform={`translate(${conf.padding} ${yearToPosition(overYear,
                conf)})`
            }>
          <rect x={-selectedBar.width / 2}
                y={-selectedBar.height / 2}
                height={selectedBar.height}
                width={selectedBar.width}
                rx={5}
                ry={5}
                className={'select-tail'}/>
        </g>}
        {years.map(year =>
            <g transform={`translate(0 ${yearToPosition(year, conf)})`}>
              <circle cx="10" cy="10" r="4" className={'year'}/>
              <text x="20" y="15" className="year-text">{year}</text>
            </g>
        )}
        {items.map(item =>
            <g transform={`translate(0 ${yearToPosition(item.year, conf)})`}>
              <text x="20" y="15" className="year-text">{item.year}</text>
              <circle cx="10" cy="10" r="4" className={'item year'}/>
              <image x="80" y="15" href={item.preview} height="100"
                     filter="url(#dropshadow)"/>
            </g>
        )}

      </svg>

  );
}

export default ArtlineSvg;
