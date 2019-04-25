import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';

export const OpenNoteListHeader = (props) => {
  return (
    <div className="item-list__header">
      <button className="button" onClick={() => {
        props.meteorCall('open-notes.insert', (err, res) => {
          if (res) {
            props.Session.set('selectedOpenNoteId', res);
          }
        });
      }}>Create Note</button>
    </div>
  );
};

OpenNoteListHeader.propTypes = {
  meteorCall: PropTypes.func.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call,
    Session
  };
}, OpenNoteListHeader);
