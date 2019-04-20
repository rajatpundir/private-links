import './main.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { AppRouter, browserHisistory } from '../imports/routes/AppRouter';

Meteor.startup(() => {
  Tracker.autorun(() => {
    const isAuthenticated = !!Meteor.userId();
    ReactDOM.render(<AppRouter/>, document.getElementById('app'))
  });
});
