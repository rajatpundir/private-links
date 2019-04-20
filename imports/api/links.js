import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';

// Create links collection.
export const Links = new Mongo.Collection('links');

// Create publication for the logged in user.
if(Meteor.isServer) {
  Meteor.publish('links', function() {
    return Links.find({ userId : this.userId});
  });
}

// Meteor methods are called by client and run on server only.
Meteor.methods({

  'links.insert'() {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Links.insert({
      from: '',
      to: '',
      userId: this.userId,
      updatedAt: moment().valueOf()
    });
  },

  'links.remove' (_id) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    Links.remove({ _id, userId: this.userId });
  },

  'links.update'(_id, updates) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      from: {
        type: String,
        optional: true
      },
      to: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });
    // Above, Simple schema makes sure only expected args were passed as updates.
    Notes.update({
      _id,
      userId: this.userId
    }, {
      $set: {
        updatedAt: moment().valueOf(),
        ...updates
      }
    });
  }
  
});
