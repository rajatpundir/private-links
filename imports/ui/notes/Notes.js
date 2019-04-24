import React from 'react';
import PropTypes from 'prop-types';
import NoteList from './NoteList';
import NoteEditor from './NoteEditor';

export default class Notes extends React.Component {
  render() {
    return(
      <div className="page-content">
        <div  className="page-content__sidebar">
          <NoteList/>
        </div>
        <div  className="page-content__main">
          <NoteEditor/>
        </div>
      </div>
    );
  }
};
