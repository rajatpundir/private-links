import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

// Makes SimpleSchema throw its error wrapped in Meteor error.
SimpleSchema.defineValidationErrorTransform((e) => {
  return new Meteor.Error(400, e.message)
});
