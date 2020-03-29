import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {API} from 'aws-amplify';
import {Button, Input, Layout} from 'antd';
import {NavLink} from "react-router-dom";
import {
  CalendarOutlined,
  HomeOutlined,
  PictureOutlined,
  UserOutlined
} from "@ant-design/icons";
import ArtItemCard from "../component/ArtItemCard";
import './AdminPage.scss';

const {TextArea} = Input;

let get = async () => {
  console.log('calling api');
  const response = await API.get('artResource', '/art/object/1');
};
let scan = async () => {
  console.log('calling api');
  return API.get('artResource', '/art');
};

function AdminPage() {
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState('');

  const [items, setItems] = useState([]);

  const fetch = async () => {
    const response = await scan();
    response.sort((a, b) => a.year - b.year)
    setItems(response);
  }

  useEffect(() => {
    fetch();
  }, []);

  const reset = () => {
    setArtist('');
    setYear('');
    setTitle('');
    setDescription('');
    setPreview('');
  }

  let post = async (art) => {
    console.log('calling api');
    const response = await API.post('artResource', '/art', {
      body: art
    });
    reset();
    fetch();
  };

  let remove = async (item) => {
    console.log('calling api');
    const response = await API.del('artResource', `/art/object/${item.id}`);
    fetch();
  }

  return (
      <Layout.Content className={'AdminPage'}>

        <NavLink to="/">
          <Button icon={<HomeOutlined/>}>Retour</Button>
        </NavLink>
        <Input allowClear={true}
               value={year} onChange={e => setYear(e.target.value)}
               placeholder={'Année'}
               prefix={<CalendarOutlined/>}/>
        <Input allowClear={true}
               value={title} onChange={e => setTitle(e.target.value)}
               placeholder={'Titre'}/>
        <Input allowClear={true}
               value={artist} onChange={e => setArtist(e.target.value)}
               placeholder={'Artiste'}
               prefix={<UserOutlined/>}/>
        <Input allowClear={true}
               value={preview} onChange={e => setPreview(e.target.value)}
               placeholder={"Adresse d'une image"}
               prefix={<PictureOutlined/>}/>
        <TextArea rows={4}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  autoSize={{minRows: 4}}
                  allowClear={true}
                  placeholder={'Description'}/>
        <Button
            onClick={() => post({year, title, artist, description, preview})}>Ajouter
        </Button>
        <div className={'ArtItemCards'}>
          {items.map(item => <ArtItemCard item={item} remove={remove}/>)}
        </div>
      </Layout.Content>
  );
}

export default AdminPage;
