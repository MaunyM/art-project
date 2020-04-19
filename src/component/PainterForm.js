import React, {useEffect, useState} from 'react';
import {Button, Input} from "antd";
import {CalendarOutlined} from "@ant-design/icons";

import './ArtForm.scss';

const {TextArea} = Input;

function PainterForm({item, onUpdate, onCancelClick}) {

  const [myArtItem, setMyArtItem] = useState(item);

  useEffect(() => {
    setMyArtItem(item)
  }, [item]);

  useEffect(() => {
    onUpdate(myArtItem);
  }, [myArtItem, onUpdate]);

  return (
      <form className={'ArtForm'}>
        <Input allowClear={true}
               value={myArtItem.name}
               onChange={e => setMyArtItem(
                   {...myArtItem, name: e.target.value})}
               placeholder={'Nom'}
               className={'art-input'}
        />
        <Input allowClear={true}
               value={myArtItem.birthYear}
               onChange={e => setMyArtItem(
                   {...myArtItem, birthYear: e.target.value})}
               placeholder={'Année de naissance'}
               prefix={<CalendarOutlined/>}
               className={'art-input'}
        />
        <Input allowClear={true}
               value={myArtItem.deathYear}
               onChange={e => setMyArtItem(
                   {...myArtItem, deathYear: e.target.value})}
               placeholder={'Année de décés'}
               prefix={<CalendarOutlined/>}
               className={'art-input'}
        />
        <TextArea rows={4}
                  value={myArtItem.description}
                  onChange={e => setMyArtItem(
                      {...myArtItem, description: e.target.value})}
                  autoSize={{minRows: 15, maxRows: 15}}
                  allowClear={true}
                  placeholder={'Description'}
                  className={'art-input'}
        />
        {myArtItem.id &&
        <Button.Group>
          <Button onClick={() => onCancelClick()}>Annuler</Button>
        </Button.Group>
        }
      </form>);
}

export default PainterForm;
