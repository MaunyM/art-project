import React from 'react';
import {Layout, Menu} from 'antd';
import {NavLink, Route, Switch} from "react-router-dom";
import {
  BorderOutlined,
  HomeOutlined,
  UserOutlined
} from "@ant-design/icons";
import './AdminPage.scss';
import AdminArtContainer from "../container/AdminArtContainer";
import AdminPainterContainer from "../container/AdminPainterContainer";

function AdminPage() {

  return (
      <Layout className={'AdminPage'}>
        <Menu mode="horizontal">

          <Menu.Item key="back">
            <NavLink to="/" exact={true}>
              <HomeOutlined/>
              Retour
            </NavLink>
          </Menu.Item>

          <Menu.Item key="art">
            <NavLink to="/admin/" exact={true}>
              <BorderOutlined/>
              Tableaux
            </NavLink>
          </Menu.Item>
          <Menu.Item key="painer" >
            <NavLink to="/admin/painter" exact={true}>
              <UserOutlined/>
              Artistes
            </NavLink>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route path="/admin/painter">
            <AdminPainterContainer/>
          </Route>
          <Route path="/">
            <AdminArtContainer/>
          </Route>
        </Switch>

      </Layout>

  );
}

export default AdminPage;
