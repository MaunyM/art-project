import React, {useEffect, useState} from 'react';
import {Button, Input} from "antd";
import {
  CalendarOutlined,
  PictureOutlined,
  UserOutlined
} from "@ant-design/icons";

import './ArtForm.scss';

const {TextArea} = Input;

function ArtForm({artItem, onPostClick, onCancelClick}) {

  const [myArtItem, setMyArtItem] = useState(artItem);

  useEffect(() => {
    setMyArtItem(artItem)
  }, [artItem]);

  return (
      <form className={'ArtForm'}>
        <div className={'cover'}>
          <img
              alt={myArtItem.title ? artItem.title : 'preview'}
              src={myArtItem.preview}
          />
        </div>
        <Input allowClear={true}
               value={myArtItem.year}
               onChange={e => setMyArtItem(
                   {...myArtItem, year: e.target.value})}
               placeholder={'Année'}
               prefix={<CalendarOutlined/>}/>
        <Input allowClear={true}
               value={myArtItem.title}
               onChange={e => setMyArtItem(
                   {myArtItem, title: e.target.value})}
               placeholder={'Titre'}/>
        <Input allowClear={true}
               value={myArtItem.artist}
               onChange={e => setMyArtItem(
                   {...myArtItem, artist: e.target.value})}
               placeholder={'Artiste'}
               prefix={<UserOutlined/>}/>
        <Input allowClear={true}
               value={myArtItem.preview}
               onChange={e => setMyArtItem(
                   {...myArtItem, preview: e.target.value})}
               placeholder={"Adresse d'une image"}
               prefix={<PictureOutlined/>}/>
        <TextArea rows={4}
                  value={myArtItem.description}
                  onChange={e => setMyArtItem({
                    ...myArtItem,
                    description: e.target.value
                  })}
                  autoSize={{minRows: 20, maxRows: 20}}
                  allowClear={true}
                  placeholder={'Description'}/>
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
