import React from 'react';
import PropTypes from 'prop-types';
import PrivateHeader from './PrivateHeader'
import Links from './links/Links'

// To-do: Create  components: A private header, a links list and create links form

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
  }
  render() {
    return(
      <div>
        <PrivateHeader title="some"/>
        <Links/>
      </div>
    );
  }
}
