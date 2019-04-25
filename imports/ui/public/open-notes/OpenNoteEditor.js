import React from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

import { OpenNotes } from '../../../api/open-notes';

export class OpenNoteEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('open-notes.update', this.props.note._id, { body });
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('open-notes.update', this.props.note._id, { title });
  }
  handleRemoval() {
    console.log('kvliy', this.props.note._id);
    this.props.call('open-notes.remove', this.props.note._id);
    Session.set('selectedOpenNoteId', undefined);
    // History prop was passed by withRouter() below.
    this.props.history.push('/opendashboard/open-notes');
  }
  componentDidUpdate(prevProps, prevState) {
    // Will be called when state or props changes.
    // Change state of component if selectedOpenNoteId was changed(new item was selected).
    const currentOpenNoteId = this.props.note ? this.props.note._id : undefined;
    const prevOpenNoteId = prevProps.note ? prevProps.note._id : undefined;
    if (currentOpenNoteId && currentOpenNoteId !== prevOpenNoteId) {
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }
  render() {
    if (this.props.note) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.title} placeholder="Untitled OpenNote" onChange={this.handleTitleChange.bind(this)} />
          <textarea className="editor__body" value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Note</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedOpenNoteId ? 'Note not found.' : 'Pick or create a note to get started.'}
          </p>
        </div>
      );
    }
  }
};

OpenNoteEditor.propTypes = {
  note: PropTypes.object,
  selectedOpenNoteId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

// withRouter() will pass updated match, location, and history props to the wrapped component whenever it renders.
export default withRouter(createContainer(() => {
  const selectedOpenNoteId = Session.get('selectedOpenNoteId');
  return {
    selectedOpenNoteId,
    note: OpenNotes.findOne(selectedOpenNoteId),
    call: Meteor.call,
    Session
  };
}, OpenNoteEditor));
