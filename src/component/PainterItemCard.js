import React from 'react';
import {Card} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import './ArtItemCard.scss';

function PainterItemCard({item, remove, edit, selected}) {
  return (
      <Card
          className={`ArtItemCard ${selected && 'selected'}`}
          cover={
            item.portrait?<img
                alt={item.name}
                src={item.portrait}
            />:<span/>
          }
          actions={[
            <EditOutlined onClick={(e) => {e.stopPropagation();  edit(item);} } key="edit"/>,
            <DeleteOutlined onClick={() => remove(item)} key="delete"/>,
          ]}
      >

        <Card.Meta
            title={item.name}
            description={`${item.birthYear} - ${item.deathYear}`}
        />
      </Card>
  );
}

export default PainterItemCard;
