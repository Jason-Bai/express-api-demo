import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import User from 'components/User';
import './header.css';
import logo from '../../logo.png';
import { routes } from '../../routes';
import { isAuthed, getUser } from '../../utils/auth';

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
    const authed = isAuthed();

    if (!authed) {
      return null;
    }

    const user = getUser();

    return (
      <Header className="wrapper-header">
        <div className="wrapper-logo">
          <div className="logo-hd">
            <h3 className="logo-name">分分彩</h3>
            <img src={logo} alt="logo" />
          </div>
        </div>
        <div className="wrapper-menu">
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
        </div>
        <div className="wrapper-user">
          {authed ? <User user={user} /> : null }
        </div>
      </Header>
    );
  }
}

export default AppHeader;
