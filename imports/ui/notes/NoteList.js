import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from '../../routes/AppRouter';
import SimpleSchema from 'simpl-schema';

import { Notes } from '../../api/notes';
import NoteListHeader from './NoteListHeader';
import NoteItem from './NoteItem';

export class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
      <div  className="item-list">
        <NoteListHeader/>
        {this.props.notes.length === 0 ? <p className="empty-item">Select or create a note to get started!</p> : undefined }
        {this.props.notes.map((note) => {
          return <NoteItem key={note._id} note={note}/>;
        })}
      </div>
    );
  }
};

NoteList.propTypes = {
  notes: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('notes');
  let selectedNoteId = Session.get('selectedNoteId');
  const noteId = browserHistory.location.pathname.split("/")[3];
  if(noteId) {
    new SimpleSchema({
      noteId: {
        type: String,
        min: 1
      }
    }).validate({ noteId });
    if(Notes.findOne(noteId)) {
      Session.set('selectedNoteId', noteId);
      selectedNoteId = noteId;
    }
  }
  return {
    notes: Notes.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((note) => {
      return {
        ...note,
        selected: note._id === selectedNoteId
      };
    })
  };
}, NoteList);
