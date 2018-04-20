import React from 'react'
import { Switch } from 'react-router-dom'
import Home from 'containers/Home';
import Login from 'containers/Login';
import NotFound from 'components/NotFound';
import Route from 'components/Route';

export const routes = [{
  title: 'Home',
  path: '/',
  exact: true,
  component: Home,
  isPrivate: true,
}, {
  title: 'Login',
  path: '/login',
  exact: true,
  component: Login,
}, {
  component: NotFound,
}];

const Routes = () => (
  <Switch>
    {routes.map((route, i) => (
      route.isPrivate ? <Route.PrivateRoute key={i} {...route} /> : <Route.SubRoute key={i} {...route} />
    ))}
  </Switch>
);

export default Routes;
