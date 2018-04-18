import React from 'react';
import { Layout } from 'antd';
import './header.css';

const { Header } = Layout;

const AppHeader = ({ collapsed, toggle }) => (
  <Header className="wrapper-header">
    <div className="logo" />
  </Header>
);

export default AppHeader;
