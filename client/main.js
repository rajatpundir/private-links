import './main.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import { AppRouter, browserHisistory, onAuthChange } from '../imports/routes/AppRouter';
// import '../imports/startup/simple-schema-configuration.js';


import App from '../imports/ui/App'
import NotFound from '../imports/ui/NotFound'

Meteor.startup(() => {
  // ReactDOM.render(<App/>, document.getElementById('app'))
  // start below
  // Render the routes defined by Router.
  // debugger;
  ReactDOM.render(<AppRouter/>, document.getElementById('app'))
});
