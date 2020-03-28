import React from 'react';
import logo from './logo.svg';
import './App.css';
import Amplify, { Analytics, Storage, API } from 'aws-amplify';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
        <p> Pick a file</p>
        <button onClick={this.post}>POST</button>
        <button onClick={this.get}>GET</button>
        <button onClick={this.list}>LIST</button>
    </div>
  );
}

export default App;
