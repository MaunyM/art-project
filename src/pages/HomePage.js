import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {API} from "aws-amplify";
import ArtDraggable from "../component/ArtDraggable";
import './HomePage.scss';
import sample from 'lodash/sample';
import ArtlineSvg from "../component/ArtlineSVG";
import {filterItemsTooNear, filterItemTooNear} from "../service/yearService";

const conf = {
  padding: 10,
  height: 2000,
  startYear: 1400,
  yearMarginError: 10,
  yearRemoving: 5,
  endYear: new Date().getFullYear(),
  selectBar: {
    width: 10,
    corner: 5
  }
}

let scan = async () => {
  return API.get('artResource', '/art');
};

function HomePage() {
  const [allItems, setAllItems] = useState([]);
  const [itemDraggable, setItemDraggable] = useState([]);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');

  const handleDrop = (year) => {
    if (Math.abs(year - itemDraggable.year) < conf.yearMarginError) {
      setMessage('')
      setItems(
          e => [...filterItemsTooNear(e, [itemDraggable.year],
              conf.yearRemoving),
            itemDraggable])
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
            <ArtlineSvg items={items} onDrop={handleDrop} conf={conf}/>
          </div>
          <div className={'side'}>
            <span className={'main-title'}>Histoire de l'art</span>
            <span>Placez ce tableau sur la frise chronologique</span>
            <ArtDraggable item={itemDraggable}/>
            <span className={'message'}>{message}</span>
          </div>
        </div>
      </Layout>
  );
}

export default HomePage;
