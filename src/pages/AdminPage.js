import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {API} from 'aws-amplify';
import {Button, Layout} from 'antd';
import {NavLink} from "react-router-dom";
import {HomeOutlined} from "@ant-design/icons";
import ArtItemCard from "../component/ArtItemCard";
import './AdminPage.scss';
import ArtForm from "../component/ArtForm";

let scan = async () => {
  console.log('calling api');
  return API.get('artResource', '/art');
};

function AdminPage() {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({})

  let post = async (art) => {
    await API.post('artResource', '/art', {
      body: art
    });
    fetch();
  };

  const fetch = async () => {
    const response = await scan();
    response.sort((a, b) => a.year - b.year)
    setItems(response);
  }

  useEffect(() => {
    fetch();
  }, []);

  let remove = async (item) => {
    await API.del('artResource', `/art/object/${item.id}`);
    setSelectedItem({})
    fetch();
  }

  let edit = (item) => {
    setSelectedItem(item)
  }

  const handleCardsClick = () =>
  {
    setSelectedItem({})
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
            <ArtForm onPostClick={post} artItem={selectedItem}/>
          </div>
        </Layout.Sider>
      </Layout>

  );
}

export default AdminPage;
