import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Artline from "../component/Artline";
import {API} from "aws-amplify";
import ArtDraggable from "../component/ArtDraggable";

let scan = async () => {
  console.log('calling api');
  return API.get('artResource', '/art');
};

function HomePage() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await scan();
      response.sort((a, b) => a.year - b.year)
      setItems(response);
    }
    fetch();
  }, []);
  return (
      <Layout>
        <Layout.Content>
          <Artline items={items}/>
        </Layout.Content>
        <Layout.Sider>
          <ArtDraggable/>
          <span
              className={'title'}>Histoire de l'art</span></Layout.Sider>
      </Layout>
  );
}

export default HomePage;
