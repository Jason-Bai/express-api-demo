import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import './header.css';
import { routes } from '../../routes';

const { Header } = Layout;

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedKey : '0',
    };
  }

  onSelected = (selectedKey) => {
    this.setState({
      selectedKey,
    });
  }

  render() {
    return (
      <Header className="wrapper-header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={[this.state.selectedKey]}
          style={{ lineHeight: '64px' }}
        >
          {routes.map((route, key) => (
            route.isMenu ? (
              <Menu.Item key={key}>
                <Link to={route.path}>{route.title}</Link>
              </Menu.Item>
            ) : null
          ))}
        </Menu>
      </Header>
    );
  }
}

export default AppHeader;
