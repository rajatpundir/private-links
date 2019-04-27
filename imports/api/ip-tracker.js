import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// Create iptracker collection.
export const IpTracker = new Mongo.Collection('iptracker');

// Put some validation for ip schema
if(Meteor.isServer) {

  Meteor.methods({

    'ip-tracker.insert'(link, ip) {
      return IpTracker.insert({
        link,
        ip
      });
    },

  });

}
