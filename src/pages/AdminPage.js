import React, {useCallback, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {API} from 'aws-amplify';
import {Button, Layout} from 'antd';
import {NavLink} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import ArtItemCard from "../component/ArtItemCard";
import './AdminPage.scss';
import ArtForm from "../component/ArtForm";
import {v4 as uuidv4} from 'uuid';

let scan = async () => {
  return API.get('artResource', '/art');
};

function AdminPage() {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({id: uuidv4()})

  useEffect(() => {
    fetch();
  }, []);

  const memoizedHandleUpdate = useCallback(
      (art) => {
        const handleUpdate = async(art) => {
          if (valid(art)) {
            await API.post('artResource', '/art', {
              body: art
            });
            await fetch();
          }
        }
        handleUpdate(art);
      },
      []
  );

  const valid = (art) =>
      art.title && art.year && art.description && art.artist && art.preview

  const fetch = async () => {
    const response = await scan();
    response.sort((a, b) => a.year - b.year)
    setItems(response);
  }


  let remove = async (item) => {
    await API.del('artResource', `/art/object/${item.id}`);
    setSelectedItem({id: uuidv4()})
    fetch();
  }

  let edit = (item) => {
    setSelectedItem(item)
  }

  const handleCardsClick = () => {
    setSelectedItem({id: uuidv4()})
  }

  return (
      <Layout className={'AdminPage'}>
        <Layout.Content>
          <div className={'content'}>
            <div className={'ArtItemCards'} onClick={handleCardsClick}>
              {items.map(
                  item => <ArtItemCard key={item.id}
                                       item={item}
                                       selected={item.id === selectedItem.id}
                                       remove={remove}
                                       edit={edit}/>)}
            </div>
          </div>
        </Layout.Content>
        <Layout.Sider width={500}>
          <NavLink to="/">
            <Button icon={<HomeOutlined/>}>Retour</Button>
          </NavLink>
          <div className={'Form'}>
            <ArtForm onArtUpdate={memoizedHandleUpdate} artItem={selectedItem}/>
          </div>
        </Layout.Sider>
      </Layout>

  );
}

export default AdminPage;
