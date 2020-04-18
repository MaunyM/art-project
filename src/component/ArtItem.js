import React from 'react';
import './ArtItem.scss';

function ArtItem({item}) {
  return (
      <div className={'ArtItem'}>
        {item &&
        <>
          {item.preview && <img alt={item.title}
                                src={item.preview}/>
          }
          <div className={'info'}>
            <span className={'title'}>{item.title}</span>
            <span className={'artist'}>{item.artist}</span>
          </div>
        </>}
      </div>
  );
}

export default ArtItem;
