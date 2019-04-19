import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router';
import history from 'history';
import { Session } from 'meteor/session';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Login from '../ui/Login';
import SignUp from '../ui/SignUp';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const broswerHistory = history.createBrowserHistory()

export const AppRouter = () => (
  <Router history={broswerHistory}>
    <Switch>
      <PublicRoute path="/" component={Login} exact={true} />
      <PublicRoute path="/signup" component={SignUp} />
      <PrivateRoute path="/dashboard" component={Dashboard} exact={true} />
      <PrivateRoute path="/dashboard/:id" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
