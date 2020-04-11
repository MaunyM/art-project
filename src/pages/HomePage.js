import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import Artline from "../component/Artline";
import {API} from "aws-amplify";
import ArtDraggable from "../component/ArtDraggable";
import {buildTick} from "../service/service";
import './HomePage.scss';
import sample from 'lodash/sample';

const conf = {
  startYear: 1400,
  margin: 50
}

let scan = async () => {
  console.log('calling api');
  return API.get('artResource', '/art');
};

function HomePage() {
  const [allItems, setAllItems] = useState([]);
  const [itemDraggable, setItemDraggable] = useState([]);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [dropYear, setDropYear] = useState();

  const handleDrop = (year) => {
    setDropYear(year)
    if (Math.abs(year - itemDraggable.year) < conf.margin) {
      setMessage('')
      setItems(e => [...e, itemDraggable])
      setItemDraggable(sample(allItems))
    } else {
      if (year > itemDraggable.year) {
        setMessage(`Cette oeuvre a été peinte avant ${year}`)
      }
      if (year < itemDraggable.year) {
        setMessage(`Cette oeuvre a été peinte après ${year}`)
      }
    }

  }

  useEffect(() => {
    // Start
    const fetch = async () => {
      const response = await scan();
      response.sort((a, b) => a.year - b.year)
      setAllItems(response);
    }
    fetch();
    setItems(buildTick(conf.startYear).map(year => ({year})))
  }, []);

  useEffect(() => {
    if (allItems.length) {
      setItemDraggable(sample(allItems))
    }
  }, [allItems]);
  return (

      <Layout>
        <div className={'HomePage'}>
          <div className={'line'}>
            <Artline items={items} onDrop={handleDrop}/>
          </div>
          <div className={'side'}>
            <span className={'main-title'}>Histoire de l'art</span>
            <span>Déplacez ce tableau sur la frise chronologique</span>
            <ArtDraggable item={itemDraggable}/>
            <span className={'message'}>{message}</span>
          </div>
        </div>
      </Layout>
  );
}

export default HomePage;
