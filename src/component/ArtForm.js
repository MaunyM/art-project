import React, {useEffect, useRef, useState} from 'react';
import {Button, Input, Rate, Select, Tooltip} from "antd";
import {
  CalendarOutlined,
  PictureOutlined
} from "@ant-design/icons";

import './ArtForm.scss';
import ArtTags from "./ArtTags";

const {TextArea} = Input;

function ArtForm({artItem, painters, onArtUpdate, onCancelClick}) {

  const [myArtItem, setMyArtItem] = useState(artItem);
  const ref = useRef();

  useEffect(() => {
    setMyArtItem(artItem)
  }, [artItem]);

  useEffect(() => {
    onArtUpdate(myArtItem);
  }, [myArtItem, onArtUpdate]);

  const handleNewTag = (newTag) => {
    const tags = myArtItem.tags ? [...myArtItem.tags, newTag] : [newTag];
    setMyArtItem({...myArtItem, tags});
  }

  const handleCloseTag = (closedTag) => {
    setMyArtItem(
        {...myArtItem, tags: myArtItem.tags.filter(tag => tag !== closedTag)})
  }

  function handleImageLoaded(e) {
    if (!myArtItem.width) {
      const width = ref.current.naturalWidth;
      const height = ref.current.naturalHeight;
      setMyArtItem(current => ({...current, width, height}))
    }
  }

  function handleArtistChanged(e) {
    setMyArtItem(
        {...myArtItem, artist: {id: e.key, name: e.label}})
  }

  return (
      <form className={'ArtForm'}>
        <div className={'cover'}>
          <img
              ref={ref}
              onLoad={handleImageLoaded}
              alt={myArtItem.title ? artItem.title : 'preview'}
              src={myArtItem.preview}
          />
        </div>
        <Tooltip placement="topLeft" title="Difficulté">
          <div className={'rating art-input ant-input-affix-wrapper'}>
            <Rate value={myArtItem.level ? myArtItem.level : 0}
                  onChange={e => setMyArtItem(
                      {...myArtItem, level: e})}/>
          </div>
        </Tooltip>
        <Input allowClear={true}
               value={myArtItem.year}
               onChange={e => setMyArtItem(
                   {...myArtItem, year: e.target.value})}
               placeholder={'Année'}
               prefix={<CalendarOutlined/>}
               className={'art-input'}
        />
        <Input allowClear={true}
               value={myArtItem.title}
               onChange={e => setMyArtItem(
                   {...myArtItem, title: e.target.value})}
               placeholder={'Titre'}
               className={'art-input'}
        />
        <Select placeholder={'Artiste'}
                className={'art-input'}
                value={myArtItem.artist && {key: myArtItem.artist.id}}
                labelInValue={true} onSelect={handleArtistChanged}>
          {painters.map(artist => <Select.Option key={artist.id}
              value={artist.id}>{artist.name}</Select.Option>)}
        </Select>
        <Input allowClear={true}
               value={myArtItem.preview}
               onChange={e => setMyArtItem(
                   {...myArtItem, preview: e.target.value})}
               placeholder={"Adresse d'une image"}
               prefix={<PictureOutlined/>}
               className={'art-input'}
        />
        <TextArea rows={4}
                  value={myArtItem.description}
                  onChange={e => setMyArtItem(
                      {...myArtItem, description: e.target.value})}
                  autoSize={{minRows: 15, maxRows: 20}}
                  allowClear={true}
                  placeholder={'Description'}
                  className={'art-input'}
        />
        <ArtTags tags={myArtItem.tags}
                 handleNewTag={handleNewTag}
                 handleCloseTag={handleCloseTag}/>
        {myArtItem.id &&
        <Button.Group>
          <Button onClick={() => onCancelClick()}>Annuler</Button>
        </Button.Group>
        }
      </form>);
}

export default ArtForm;
