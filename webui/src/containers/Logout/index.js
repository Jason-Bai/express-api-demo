import React from 'react';
import { withRouter } from 'react-router-dom';
import { isAuthed, removeToken } from '../../utils/auth';


class Logout extends React.Component {
  componentWillMount() {
    const authed = isAuthed();
    if (!authed) {
      this.props.history.push('/login');
      return;
    }
    removeToken();
    this.props.history.push('/login');
  }
  render() {
    return null;
  }
}

export default withRouter(Logout);
