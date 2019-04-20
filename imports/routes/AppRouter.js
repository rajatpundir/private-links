import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'history';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Import Components
import LogIn from '../ui/LogIn';
import SignUp from '../ui/SignUp';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const broswerHistory = history.createBrowserHistory()

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
});

// You may want to refactor public and privates routes as components separately.
export const AppRouter = () => (
  <Router history={broswerHistory}>
    <Switch>
      <Route exact path="/" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<LogIn/>)
      )}/>
      <Route exact path="/signup" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<SignUp/>)
      )}/>
      <Route exact path="/dashboard" render={() => (
        !!Meteor.userId() ? (<Dashboard/>) : (<Redirect to="/"/>)
      )}/>
      <Route exact path="/dashboard/:id" render={() => (
        !!Meteor.userId() ? (<Dashboard/>) : (<Redirect to="/"/>)
      )}/>
      <Route path="*" component={NotFound} />
    </Switch>
  </Router>
);
