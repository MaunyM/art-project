import React from 'react';
import {Card} from "antd";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import './ArtItemCard.scss';

function ArtItemCard({item, remove, edit, selected}) {
  return (
      <Card
          className={`ArtItemCard ${selected && 'selected'}`}
          cover={
            <img
                alt={item.title}
                src={item.preview}
            />
          }
          actions={[
            <EditOutlined onClick={(e) => {e.stopPropagation();  edit(item);} } key="edit"/>,
            <DeleteOutlined onClick={() => remove(item)} key="delete"/>,
          ]}
      >
        <Card.Meta
            title={item.title}
            description={item.artist.name}
        />
      </Card>
  );
}

export default ArtItemCard;
