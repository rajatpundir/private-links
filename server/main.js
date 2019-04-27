import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/api/users';
import {Links} from '../imports/api/links';
import {Notes} from '../imports/api/notes';
import {OpenNotes} from '../imports/api/open-notes';
import {IpTracker} from '../imports/api/ip-tracker';
import '../imports/startup/simple-schema-configuration.js';

// Test it, build bots, conquer.
Meteor.startup(() => {
  // code to run on server at startup
  // Webhook for redirection.
  console.log('App running successfully on server.');
  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({ _id });
    if(link) {
      res.statusCode = 302;
      res.setHeader('Location', link.url);
      res.end();
      Meteor.call('links.trackVisit', _id);
      console.log('IP', req.headers['x-forwarded-for']);
      if(req.headers['x-forwarded-for']) {
        Meteor.call('ip-tracker.insert', _id, req.headers['x-forwarded-for']);
      }
    } else {
      // let app function normally but what is normal.
      const entrypoints = [
        '/',
        '/secretsignin',
        '/secretsignup',
        '/demo-app',
        '/dashboard/links',
        '/dashboard/notes'
      ];
      const allowed = (entrypoints.indexOf(req.url) > -1);
      if (allowed || req.url.startsWith('/opendashboard')) {
        if(req.url.startsWith('/dashboard/')) {
          setTimeout(() => {next();}, 2000);
        } else {
            next();
        }
      }
    }
  });
});
