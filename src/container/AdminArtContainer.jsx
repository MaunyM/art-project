import {Layout} from "antd";
import ArtItemCard from "../component/ArtItemCard";
import ArtForm from "../component/ArtForm";
import React, {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {delArt, postArt, scanArt} from "../service/apiService";

function AdminArtContainer() {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({id: uuidv4()})

  useEffect(() => {
    fetch();
  }, []);

  const valid = (art) =>
      art.title && art.year && art.description && art.artist && art.preview

  const fetch = async () => {
    const response = await scanArt();
    response.sort((a, b) => a.year - b.year)
    setItems(response);
  }

  let remove = async (art) => {
    await delArt(art)
    setSelectedItem({id: uuidv4()})
    fetch();
  }

  let edit = (item) => {
    setSelectedItem(item)
  }

  const handleCardsClick = () => {
    setSelectedItem({id: uuidv4()})
  }

  const memoizedHandleUpdate = useCallback(
      (art) => {
        const handleUpdate = async (art) => {
          if (valid(art)) {
            await postArt(art);
            await fetch();
          } else {
            console.log('pas valide')
          }
        }
        handleUpdate(art);
      },
      []
  );

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
          <div className={'Form'}>
            <ArtForm onArtUpdate={memoizedHandleUpdate}
                     artItem={selectedItem}/>
          </div>
        </Layout.Sider>
      </Layout>)
}

export default AdminArtContainer;