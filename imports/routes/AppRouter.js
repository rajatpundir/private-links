import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'history';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Import Components
import LogIn from '../ui/LogIn';
import SignUp from '../ui/SignUp';
import NotFound from '../ui/NotFound';

import Dashboard from '../ui/Dashboard';
// Not using below.
import Links from '../ui/links/Links';
import Notes from '../ui/notes/Notes';

export const browserHisistory = history.createBrowserHistory()

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
});

// You may want to refactor public and privates routes as components separately.
export const AppRouter = () => (
  <Router history={browserHisistory}>
    <Switch>
      <Route exact path="/" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<LogIn/>)
      )}/>
      <Route exact path="/signup" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<SignUp/>)
      )}/>
      <Route path="/dashboard" render={() => (
          !!Meteor.userId() ? (<Dashboard/>) : (<Redirect to="/"/>)
        )}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
