import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
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

  'links.insert'(url) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      url: {
        type: String,
        label: 'Your link',
        regEx: SimpleSchema.RegEx.Url
      }
    }).validate({ url });
    return Links.insert({
      to: url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null,
      updatedAt: moment().valueOf()
    });
  },

  'links.setVisibility'(_id, visible) {
    if(!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    }).validate({ _id, visible });
    Links.update({
      _id,
      userId: this.userId
    }, {
      $set: {visible}
    });
  },

  'links.trackVisit'(_id) {
    new SimpleSchema({
      _id: {
        type: String,
        min: 1
      }
    }).validate({ _id });
    Links.update({ _id }, {
      $set: {
        lastVisitedAt: moment().valueOf()
      },
      $inc: {
        visitedCount: 1
      }
    });
  },

  // Disable remove option to avoid broken links.
  'links.remove'(_id) {
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
      to: {
        type: String,
        optional: true
      }
    }).validate({
      _id,
      ...updates
    });
    // Here, Simple schema makes sure only expected args were passed as updates.
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
