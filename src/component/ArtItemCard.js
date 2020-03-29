import React from 'react';
import './ArtLineItem.scss';
import {Card} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import './ArtItemCard.scss';

function ArtItemCard({item, remove}) {
  return (
      <Card
          className={"ArtItemCard"}
          cover={
            <img
                alt="example"
                src={item.preview}
            />
          }
          actions={[
            <DeleteOutlined onClick={() => remove(item)} key="delete"/>,
          ]}
      >
        <Card.Meta
            title={item.title}
            description={item.artist}
        />
      </Card>
  );
}

export default ArtItemCard;
