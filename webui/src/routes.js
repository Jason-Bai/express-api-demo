import React from 'react'
import { Switch } from 'react-router-dom'
import Home from './containers/Home';
import Login from './containers/Login';
import NotFound from './components/NotFound';
import SubRoute from './components/SubRoute';

const routes = [{
  title: 'Login',
  path: '/login',
  exact: true,
  component: Login,
}, {
  title: 'Home',
  path: '/app',
  exact: true,
  component: Home,
}, {
  component: NotFound,
}];

const Routes = () => (
  <Switch>
    {routes.map((route, i) => (
      <SubRoute key={i} {...route} />
    ))}
  </Switch>
);

export default Routes;
