import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import './App.css';
import Header from '../components/Header';
import Routes from '../routes';
import { isTokenValid, isUserValid } from '../utils/auth';
import history from '../utils/history';

const { Content } = Layout;

class App extends React.Component {
  componentWillMount() {
    const tokenValid = isTokenValid();

    if (!tokenValid) {
      history.push('/login');
      return;
    }

    const userValid = isUserValid();

    if (!userValid) {
      history.push('/login');
      return;
    }
  }

  render() {
    return (
      <Router>
        <Layout className="wrapper-app">
          <Header />
          <Layout>
            <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 400 }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default App;
