import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import moment from 'moment';
import SimpleSchema from 'simpl-schema';

export const OpenNotes = new Mongo.Collection('opennotes');

if (Meteor.isServer) {
  Meteor.publish('open-notes', function () {
    return OpenNotes.find({});
  });
}

Meteor.methods({
  'open-notes.insert'() {
    return OpenNotes.insert({
      title: '',
      body: '',
      updatedAt: moment().valueOf()
    });
  },

  'open-notes.remove'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    OpenNotes.remove({ _id });
  },

  'open-notes.update'(_id, updates) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      title: {
        type: String,
        optional: true
      },
      body: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });
    OpenNotes.update({
      _id
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }

});
