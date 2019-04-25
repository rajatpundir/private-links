import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from '../../../routes/AppRouter';
import SimpleSchema from 'simpl-schema';

import { OpenNotes } from '../../../api/open-notes';
import OpenNoteListHeader from './OpenNoteListHeader';
import OpenNoteItem from './OpenNoteItem';

export class OpenNoteList extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div className="item-list">
        <OpenNoteListHeader/>
        {this.props.notes.length === 0 ? <p className="empty-item">Select or create a note to get started!</p> : undefined }
        {this.props.notes.map((note) => {
          return <OpenNoteItem key={note._id} note={note}/>;
        })}
      </div>
    );
  }
};

OpenNoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('open-notes');
  let selectedOpenNoteId = Session.get('selectedOpenNoteId');
  const noteId = browserHistory.location.pathname.split("/")[3];
  if(noteId) {
    new SimpleSchema({
      noteId: {
        type: String,
        min: 1
      }
    }).validate({ noteId });
    if(OpenNotes.findOne(noteId)) {
      Session.set('selectedOpenNoteId', noteId);
      selectedOpenNoteId = noteId;
    }
  }
  return {
    notes: OpenNotes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedOpenNoteId
      };
    })
  };
}, OpenNoteList);
