import React from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import moment from 'moment';
import { Session } from 'meteor/session';

export const OpenNoteItem = (props) => {
  const className = props.note.selected ? 'item item--selected' : 'item';
  return (
    <div className={className} onClick={() => {props.Session.set('selectedOpenNoteId', props.note._id);}}>
      <h5  className="item__title">{ props.note.title || 'Untitled note' }</h5>
      <p className="item__subtitle">{ moment(props.note.updatedAt).format('D-MMM-YY h:mm A') }</p>
    </div>
  );
};

OpenNoteItem.propTypes = {
  note: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

export default createContainer(() => {
  return { Session };
}, OpenNoteItem);
