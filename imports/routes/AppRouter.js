import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from 'history';
import { Session } from 'meteor/session';

// Below commented not working properly, to be dealt with in future.
// import PrivateRoute from './PrivateRoute';
// import PublicRoute from './PublicRoute';

import LogIn from '../ui/LogIn';
import SignUp from '../ui/SignUp';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const broswerHistory = history.createBrowserHistory()

export const AppRouter = () => (
  <Router history={broswerHistory}>
    <Switch>
      <Route path="/" component={LogIn} exact={true} />
      <Route path="/signup" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} exact={true} />
      <Route path="/dashboard/:id" component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
