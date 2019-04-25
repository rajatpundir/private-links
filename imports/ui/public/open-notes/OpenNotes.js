import React from 'react';
import PropTypes from 'prop-types';
import OpenNoteList from './OpenNoteList';
import OpenNoteEditor from './OpenNoteEditor';

export default class OpenNotes extends React.Component {
  render() {
    return(
      <div className="page-content">
        <div className="page-content__sidebar">
          <OpenNoteList/>
        </div>
        <div className="page-content__main">
          <OpenNoteEditor/>
        </div>
      </div>
    );
  }
};
