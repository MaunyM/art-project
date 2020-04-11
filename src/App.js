import React from 'react';
import './App.scss';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import {CrownOutlined,} from '@ant-design/icons';
import {NavLink, Route, Switch} from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import Backend from 'react-dnd-html5-backend'
import TouchBackend from 'react-dnd-touch-backend'
import {DndProvider} from "react-dnd";

import {isMobile} from 'react-device-detect';

Amplify.configure(awsconfig);

const backend = isMobile ? TouchBackend : Backend

function App() {
  return (
      <DndProvider backend={backend}>
        <div className="App">
          <Layout>
            <Layout.Header className={'main'}>
              <Menu>
                <Menu.Item>
                  <NavLink to="/admin">
                    <CrownOutlined/>
                    Administration
                  </NavLink>
                </Menu.Item>

              </Menu>
            </Layout.Header>


            <Switch>
              <Route path="/admin">
                <AdminPage/>
              </Route>
              <Route path="/">
                <HomePage/>
              </Route>
            </Switch>

            <Layout.Footer/>
          </Layout>
        </div>
      </DndProvider>
  );
}

export default App;
