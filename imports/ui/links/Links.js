import React from 'react';
import PropTypes from 'prop-types';
import LinksList from './LinksList';
import LinkEditor from './LinkEditor';

export default class Links extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
  }
  render() {
    return(
      <div className="page-content">
        <div className="page-content__sidebar">
          <LinksList/>
        </div>
        <div className="page-content__main">
          <LinkEditor/>
        </div>
      </div>
    );
  }
}
