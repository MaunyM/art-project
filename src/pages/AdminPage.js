import React from 'react';
import 'antd/dist/antd.css';
import {API} from 'aws-amplify';
import {Layout} from 'antd';
import {NavLink} from "react-router-dom";

let post = async () => {
  console.log('calling api');
  const response = await API.post('api', '/art', {
    body: {
      id: '1',
      name: 'hello amplify!'
    }
  });
  alert(JSON.stringify(response, null, 2));
};
let get = async () => {
  console.log('calling api');
  const response = await API.get('api', '/art/object/1');
  alert(JSON.stringify(response, null, 2));
};
let list = async () => {
  console.log('calling api');
  const response = await API.get('api', '/art/1');
  alert(JSON.stringify(response, null, 2));
};

function AdminPage() {
  return (
      <Layout.Content>
        <p> Pick a file</p>
        <NavLink to="/">
          <button>Retour</button>
        </NavLink>
        <button onClick={post}>POST</button>
        <button onClick={get}>GET</button>
        <button onClick={list}>LIST</button>
      </Layout.Content>
  );
}

export default AdminPage;
