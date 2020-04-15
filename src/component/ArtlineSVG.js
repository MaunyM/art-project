import React, {useEffect, useRef, useState} from 'react';
import './ArtlineSVG.scss';
import {
  buildTick, filterTooNear,
  positionToYear,
  yearInPixel,
  yearToPosition
} from "../service/yearService";

function ArtlineSvg({items, onDrop, conf}) {

  const ref = useRef(null)
  const [years, setYears] = useState(buildTick(conf.startYear));
  const [overYear, setOverYear] = useState(0);
  const [selectedBar, setSelectedBar] = useState({});
  const [overVisible, setOverVisible] = useState(false);

  useEffect(() => {
    setSelectedBar(
        {
          ...conf.selectBar,
          height: conf.yearMarginError * yearInPixel(conf) * 2
        })
  }, [conf])

  useEffect(() => {
    console.log("years", years)
    const afterYears = filterTooNear(years, items.map(item => item.year), 5)
    setYears(afterYears);
    console.log("filter", afterYears)
  }, [items])

  function handleMouserMove(event) {
    if (overVisible) {
      const offSetY = event.clientY - ref.current.getBoundingClientRect().top
      setOverYear(positionToYear(offSetY, conf))
    }
  }

  return (
      <svg height={conf.height} className={'ArtlineSVG'}
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
              <image x="80" y="0" href={item.preview} height="100"
                     filter="url(#dropshadow)"/>
            </g>
        )}

      </svg>

  );
}

export default ArtlineSvg;
