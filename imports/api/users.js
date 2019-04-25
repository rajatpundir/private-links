import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { Accounts } from 'meteor/accounts-base';

// The below function is a callback and should return true if user creation is to be proceeded by Meteor using Accounts.createUser method in the SignUp form.
export const validateNewUser = (user) => {
  // Password is hashed, so its length should be valdated on client side instead.
  // We validate email format here, if SimplSchema throws error, user will not be created in database.
  const email = user.emails[0].address
  // Validating with
  if(email !== 'admin@pundir.tech') {
    return false;
  }
  new SimpleSchema({
    email: {
      type: String,
      regEx: SimpleSchema.RegEx.Email
    }
  }).validate({email});
  return true;
};

if(Meteor.isServer) {
  Accounts.validateNewUser(validateNewUser)
}
