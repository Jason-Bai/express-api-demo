import React from 'react'
import { Switch } from 'react-router-dom'
import Home from 'containers/Home';
import Dashboard from 'containers/Dashboard';
import Profile from 'containers/Profile';
import Login from 'containers/Login';
import Logout from 'containers/Logout';
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
  component: Dashboard,
  isPrivate: true,
  isMenu: true,
}, {
  title: 'Profile',
  path: '/profile',
  component: Profile,
  isPrivate: true,
  isMenu: false,
}, {
  title: 'Login',
  path: '/login',
  isMenu: false,
  component: Login,
}, {
  title: 'Logout',
  path: '/logout',
  isMenu: false,
  component: Logout,
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
