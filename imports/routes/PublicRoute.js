import React from 'react';
import { Route, Redirect } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

export const PublicRoute = ({
isAuthenticated,
component: Component,
...rest
}) => (
  <Route {...rest} render={(props) => (
    isAuthenticated ? (
      <Redirect to="/dashboard" />
    ) : (
        <Component {...props} />
      )
  )} />
);

export default withTracker(() => ({
isAuthenticated: !!Meteor.userId()
}), PublicRoute);
