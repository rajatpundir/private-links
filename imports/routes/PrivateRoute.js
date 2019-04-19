import React from 'react';
import { Route, Redirect } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
    <Route {...rest} render={(props) => (
      isAuthenticated ? (
        <Component {...props} />
      ) : (
          <Redirect to="/" />
        )
    )} />
  );

export default withTracker(() => ({
  isAuthenticated: !!Meteor.userId()
}), PrivateRoute);
