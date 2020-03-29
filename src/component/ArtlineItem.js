import React from 'react';
import './ArtLineItem.scss';

function ArtlineItem({item}) {
  return (
      <li className="ant-timeline-item ArtlineItem"
          style={{height: `${item.height}px`}}>
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
      </li>
  );
}

export default ArtlineItem;
