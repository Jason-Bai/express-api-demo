import React from 'react';
import { Avatar, Menu, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import './user.css';
import avatar from '../../avatar.png';

const menu = (
  <Menu className="user-menu">
    <Menu.Item className="user-menu-item">
      <Link to="/profile">Profile</Link>
    </Menu.Item>
    <Menu.Item className="user-menu-item">
      <Link to="/logout">Logout</Link>
    </Menu.Item>
  </Menu>
);


class User extends React.Component {
  render() {
    const { user } = this.props;

    return (
      <div className="user">
        {user ? (
          <Dropdown overlay={menu} placement="bottomRight">
            <div className="user-hd">
              <div className="user-avatar">
                <Avatar src={avatar} />
              </div>
              <div className="user-name">{user.name}</div>
            </div>
          </Dropdown>
        ) : null}
      </div>
    );
  }
}

export default User;
