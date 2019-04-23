import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
  }
  render() {
    return(
      <div>
        <NoteList/>
        <Editor/>
      </div>
    );
  }
}
