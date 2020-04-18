import React, {useEffect, useRef, useState} from 'react';
import './ArtlineSVG.scss';
import {
  buildTick, filterTooNear,
  positionToYear,
  yearInPixel,
  yearToPosition
} from "../service/yearService";

const yearCenter = 10;

function ArtlineSvg({items, onDrop, conf, help}) {

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
    setYears(
        current => filterTooNear(current, items.map(item => item.year), 5));
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
        {help.top &&
        <g transform={`translate(0 ${yearToPosition(help.top,
            conf)})`}>
          <path className={'down-arrow'}
                d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937   c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
        </g>
        }
        {help.bottom &&
        <g transform={`translate(0 ${yearToPosition(help.bottom,
            conf)})`}>
          <path className={'up-arrow'}
                d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937   c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937   c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z"/>
        </g>
        }

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
            <g key={year}
               transform={`translate(${conf.padding
               - yearCenter} ${yearToPosition(year, conf)})`}>
              <circle cx={yearCenter} cy={yearCenter} r="4" className={'year'}/>
              <text x="20" y="15" className="year-text">{year}</text>
            </g>
        )}
        {items.map(item =>
            <g transform={`translate(${conf.padding
            - yearCenter}  ${yearToPosition(item.year, conf)})`}>
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
