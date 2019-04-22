import React from 'react';
import PropTypes from 'prop-types';
import AddLink from './AddLink'
import LinksList from './LinksList';

export default class Links extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
  }
  render() {
    return(
      <div>
        <AddLink/>
        <LinksList/>
      </div>
    );
  }
}
