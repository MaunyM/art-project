import React, {useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Layout} from 'antd';
import ArtItem from "../component/ArtItem";
import './HomePage.scss';
import sampleSize from 'lodash/sampleSize';
import tail from 'lodash/tail';
import ArtlineSvg from "../component/ArtlineSVG";
import {filterItemsTooNear} from "../service/yearService";
import {scanArt} from "../service/apiService";

const conf = {
  padding: 50,
  height: 2000,
  startYear: 1400,
  yearMarginError: 10,
  yearRemoving: 5,
  previewHeight: 100,
  endYear: new Date().getFullYear(),
  selectBar: {
    width: 10,
    corner: 5
  }
}


function HomePage() {
  const [allItems, setAllItems] = useState([]);
  const [gameItems, setGameItems] = useState([]);
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
      setGameItems(current => tail(current))
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
      const response = await scanArt();
      response.sort((a, b) => a.year - b.year)
      setAllItems(response);
    }
    fetch();
  }, []);

  useEffect(() => {
    if (allItems.length) {
      setGameItems(sampleSize(allItems, 5))
    }
  }, [allItems]);

  useEffect(() => {
    setCurrentItem(gameItems[0])
  }, [gameItems]);

  return (

      <Layout>
        <div className={'HomePage'}>
          <div className={'line'}>
            <ArtlineSvg items={items} onDrop={handleDrop} conf={conf}
                        help={help}/>
          </div>
          <div className={'side'}>
            <span className={'main-title'}>Histoire de l'art</span>
            {currentItem && <>
              <span className={'instruction'}>Placez ce tableau sur la frise chronologique</span>
              <ArtItem item={currentItem}/>
              <span className={'message'}>{message}</span>
            </>}
          </div>
        </div>
      </Layout>
  );
}

export default HomePage;
