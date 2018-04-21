import React from 'react';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route, Redirect } from 'react-router-dom';
import { isAuthed } from 'utils/auth';

class PrivateRoute extends React.Component {
  componentWillMount() {
    nprogress.start();
  }

  componentDidMount() {
    nprogress.done()
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthed() ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

export default PrivateRoute;
