import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Header from 'components/Header';
import Routes from '../routes';

const { Content } = Layout;

const App = () => (
  <Router>
    <Layout className="wrapper-app">
      <Header />
      <Layout>
        <Content className="wrapper-content">
          <Routes />
        </Content>
      </Layout>
    </Layout>
  </Router>
);

export default App;
