import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import {API} from "aws-amplify";
import ArtItem from "../component/ArtItem";
import './HomePage.scss';
import sample from 'lodash/sample';
import ArtlineSvg from "../component/ArtlineSVG";
import {filterItemsTooNear} from "../service/yearService";

const conf = {
  padding: 50,
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
  const [currentItem, setCurrentItem] = useState([]);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [help, setHelp] = useState({});

  const handleDrop = (year) => {
    if (Math.abs(year - currentItem.year) < conf.yearMarginError) {
      setMessage('')
      setItems(
          e => [...filterItemsTooNear(e, [currentItem.year],
              conf.yearRemoving),
            currentItem])
      setCurrentItem(sample(allItems))
      setHelp({})
    } else {
      if (year > currentItem.year) {
        setHelp(previous => ({...previous, bottom: year}))
        setMessage(`Cette oeuvre a été peinte avant ${year}`)
      }
      if (year < currentItem.year) {
        setHelp(previous => ({...previous, top: year}))
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
      setCurrentItem(sample(allItems))
    }
  }, [allItems]);

  return (

      <Layout>
        <div className={'HomePage'}>
          <div className={'line'}>
            <ArtlineSvg items={items} onDrop={handleDrop} conf={conf}
                        help={help}/>
          </div>
          <div className={'side'}>
            <span className={'main-title'}>Histoire de l'art</span>
            <span className={'instruction'}>Placez ce tableau sur la frise chronologique</span>
            <ArtItem item={currentItem}/>
            <span className={'message'}>{message}</span>
          </div>
        </div>
      </Layout>
  );
}

export default HomePage;
