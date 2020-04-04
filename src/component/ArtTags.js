import React, {useEffect, useRef, useState} from 'react';
import {Input, Tag} from "antd";

import './ArtTags.scss';
import {PlusOutlined} from "@ant-design/icons";
import 'antd/dist/antd.css';

function ArtTags({tags, handleNewTag, handleCloseTag}) {

  const inputEl = useRef(null);
  const [inputVisible, setInputVisible] = useState(false);
  const [myTags, setMyTags] = useState(tags ? tags : []);
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    setMyTags(tags ? tags : [])
  }, [tags]);

  const handleInputConfirm = () => {
    handleNewTag(newTag);
    setNewTag('');
    setInputVisible(false);
  };

  const showInput = () => {
    setInputVisible(true);
  };
  useEffect(() => {
    if (inputVisible) {
      inputEl.current.focus();
    }
  }, [inputVisible])
  return (
      <div className={'ArtTags'}>
        {myTags.map((tag) => (
            <span key={tag} style={{display: 'inline-block'}}>
              <Tag closable={true}
                   color={'purple'}
                   onClose={() => handleCloseTag(tag)}>
                {tag}
              </Tag>
            </span>
        ))
        }
        {inputVisible ? <Input
                ref={inputEl}
                type="text"
                size="small"
                style={{width: 130}}
                value={newTag}
                onChange={e => setNewTag(e.target.value)}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
            /> :
            <Tag className="tag-plus" color={'blue'} onClick={showInput}>
              <PlusOutlined/> Nouvelle catégorie
            </Tag>}
      </div>)

}

export default ArtTags;
