import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Artline from "../component/Artline";
import {API} from "aws-amplify";

let scan = async () => {
  console.log('calling api');
  return API.get('artResource', '/art');
};

let items = [
  {
    year: 1800
  },
  {
    year: 1820,
    preview: '406px-Francisco_Goya_Self-Portrait_with_Dr_Arrieta_MIA_5214.jpg',
    artist: 'Goya',
    title: 'Goya et son médecin '
  }, {
    year: 1849,
    preview: 'Gustave_Courbet_-_A_Burial_at_Ornans_-_Google_Art_Project_2.jpg',
    artist: 'Gustave Courbet',
    title: 'Un enterrement à Ornans'
  }, {
    year: 1873,
    preview: 'Paul_Cézanne_-_Autoportrait_en_casquette_(c.1872).jpg',
    artist: 'Cezanne',
    title: 'Autorportait en casquette'
  },
  {
    year: 1890,
    preview: '800px-Vincent_van_Gogh_(1853-1890)_-_Wheat_Field_with_Crows_(1890).jpg',
    artist: 'Vincent Van Gogh',
    title: 'Champs de blé aux corbeaux '
  }

]

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
        <Layout.Sider> <span
            className={'title'}>Histoire de l'art</span></Layout.Sider>
      </Layout>
  );
}

export default HomePage;
