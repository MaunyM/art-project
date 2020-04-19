import {Layout} from "antd";
import React, {useCallback, useEffect, useState} from "react";
import {v4 as uuidv4} from "uuid";
import {delPainter, postPainter, scanPainter} from "../service/apiService";
import PainterForm from "../component/PainterForm";
import PainterItemCard from "../component/PainterItemCard";

function AdminPainterContainer() {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState({id: uuidv4()})

  useEffect(() => {
    fetch();
  }, []);

  const valid = (painter) =>
      painter.name && painter.birthYear

  const fetch = async () => {
    const response = await scanPainter();
    response.sort((a, b) => a.year - b.year)
    setItems(response);
  }

  let remove = async (art) => {
    await delPainter(art)
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
      (painter) => {
        const handleUpdate = async (painter) => {
          if (valid(painter)) {
            await postPainter(painter);
            await fetch();
          }
        }
        handleUpdate(painter);
      },
      []
  );

  return (
      <Layout className={'AdminPage'}>
        <Layout.Content>
          <div className={'content'}>
            <div className={'ArtItemCards'} onClick={handleCardsClick}>
              {items.map(
                  item => <PainterItemCard key={item.id}
                                       item={item}
                                       selected={item.id === selectedItem.id}
                                       remove={remove}
                                       edit={edit}/>)}
            </div>
          </div>
        </Layout.Content>
        <Layout.Sider width={500}>
          <div className={'Form'}>
            <PainterForm onUpdate={memoizedHandleUpdate}
                         item={selectedItem}/>
          </div>
        </Layout.Sider>
      </Layout>)
}

export default AdminPainterContainer;