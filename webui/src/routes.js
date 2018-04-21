import React from 'react'
import { Switch } from 'react-router-dom'
import Home from 'containers/Home';
import Dashboard from 'containers/Dashboard';
import Login from 'containers/Login';
import NotFound from 'components/NotFound';
import Route from 'components/Route';

export const routes = [{
  title: 'Home',
  path: '/',
  exact: true,
  component: Home,
  isPrivate: true,
  isMenu: true,
}, {
  title: 'Dashboard',
  path: '/dashboard',
  exact: true,
  component: Dashboard,
  isPrivate: true,
  isMenu: true,
}, {
  title: 'Login',
  path: '/login',
  exact: true,
  isMenu: false,
  component: Login,
}, {
  component: NotFound,
}];

const Routes = () => (
  <Switch>
    {routes.map((route, id) => (
      route.isPrivate ? <Route.PrivateRoute key={id} {...route} /> : <Route.SubRoute key={id} {...route} />
    ))}
  </Switch>
);

export default Routes;
