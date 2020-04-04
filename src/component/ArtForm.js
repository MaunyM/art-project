import React, {useEffect, useState} from 'react';
import {Button, Input, Rate, Tooltip} from "antd";
import {
  CalendarOutlined,
  PictureOutlined,
  UserOutlined
} from "@ant-design/icons";

import './ArtForm.scss';
import ArtTags from "./ArtTags";

const {TextArea} = Input;

function ArtForm({artItem, onPostClick, onCancelClick}) {

  const [myArtItem, setMyArtItem] = useState(artItem);

  useEffect(() => {
    setMyArtItem(artItem)
  }, [artItem]);

  const handleNewTag = (newTag) => {
    const tags = myArtItem.tags ? [...myArtItem.tags, newTag] : [newTag];
    setMyArtItem({...myArtItem, tags});
  }

  const handleCloseTag = (closedTag) => {
    setMyArtItem(
        {...myArtItem, tags: myArtItem.tags.filter(tag => tag !== closedTag)})
  }

  return (
      <form className={'ArtForm'}>
        <div className={'cover'}>
          <img
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
                   {myArtItem, title: e.target.value})}
               placeholder={'Titre'}
               className={'art-input'}
        />
        <Input allowClear={true}
               value={myArtItem.artist}
               onChange={e => setMyArtItem(
                   {...myArtItem, artist: e.target.value})}
               placeholder={'Artiste'}
               prefix={<UserOutlined/>}
               className={'art-input'}
        />
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
                  onChange={e => setMyArtItem({
                    ...myArtItem,
                    description: e.target.value
                  })}
                  autoSize={{minRows: 15, maxRows: 15}}
                  allowClear={true}
                  placeholder={'Description'}
                  className={'art-input'}
        />
        <ArtTags tags={myArtItem.tags}
                 handleNewTag={handleNewTag}
                 handleCloseTag={handleCloseTag}/>
        {myArtItem.id ?
            <Button.Group>
              <Button onClick={() => onPostClick(myArtItem)}>Modifier</Button>
              <Button onClick={() => onCancelClick()}>Annuler</Button>
            </Button.Group> :
            <Button onClick={() => onPostClick(myArtItem)}>Ajouter</Button>
        }
      </form>);
}

export default ArtForm;