import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from 'history';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

// Import Components
import LogIn from '../ui/generic/LogIn';
import SignUp from '../ui/generic/SignUp';
import NotFound from '../ui/generic/NotFound';

import Dashboard from '../ui/Dashboard';
// Public Components below
import OpenDashboard from '../ui/public/OpenDashboard';

export const browserHistory = history.createBrowserHistory()

Tracker.autorun(() => {
  const isAuthenticated = !!Meteor.userId();
});

// You may want to refactor public and privates routes as components separately.
export const AppRouter = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/secretsignin" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<LogIn/>)
      )}/>
      <Route exact path="/secretsignup" render={() => (
        !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<SignUp/>)
      )}/>
      <Route path="/dashboard" render={() => (
        !!Meteor.userId() ? (<Dashboard/>) : (<Redirect to="/"/>)
      )}/>
      <Route path="/demo-app" render={() => (<Redirect to="/opendashboard"/>)}/>
      <Route path="/opendashboard" render={() => (<OpenDashboard/>)}/>
    </Switch>
  </Router>
);


// Redundant copy of routes
// export const AppRouter = () => (
//   <Router history={browserHistory}>
//     <Switch>
//       <Route exact path="/" render={() => (
//         !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<LogIn/>)
//       )}/>
//       <Route exact path="/signup" render={() => (
//         !!Meteor.userId() ? (<Redirect to="/dashboard"/>) : (<SignUp/>)
//       )}/>
//       <Route path="/dashboard" render={() => (
//         !!Meteor.userId() ? (<Dashboard/>) : (<Redirect to="/"/>)
//       )}/>
//       <Route path="*" component={NotFound} />
//     </Switch>
//   </Router>
// );
