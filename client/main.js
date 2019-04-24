import './main.html';
import React from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';
import { AppRouter, browserHistory } from '../imports/routes/AppRouter';

Tracker.autorun(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  Session.set('isNavOpen', false);
  if (selectedNoteId) {
    browserHistory.replace(`/dashboard/notes/${selectedNoteId}`);
  }
});

Tracker.autorun(() => {
  const selectedLinkId = Session.get('selectedLinkId');
  Session.set('isNavOpen', false);
  if (selectedLinkId) {
    browserHistory.replace(`/dashboard/links/${selectedLinkId}`);
  }
});

Tracker.autorun(() => {
  // Toggles css class based on session variable's value
  const isNavOpen = Session.get('isNavOpen');
  document.body.classList.toggle('is-nav-open', isNavOpen);
});

Meteor.startup(() => {
  Tracker.autorun(() => {
    Session.set('selectedNoteId', undefined);
    Session.set('selectedLinkId', undefined);
    const isAuthenticated = !!Meteor.userId();
    ReactDOM.render(<AppRouter/>, document.getElementById('app'))
  });
});
