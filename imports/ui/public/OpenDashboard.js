import React from 'react';
import PropTypes from 'prop-types';
import PrivateHeader from './open-generic/OpenPrivateHeader';
import OpenNotes from './open-notes/OpenNotes';
import { browserHistory } from '../../routes/AppRouter';

export default class OpenDashboard extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    if(browserHistory.location.pathname === '/opendashboard'){
      browserHistory.replace('/opendashboard/open-notes');
    }
  }
  render() {
    return(
      <div>
        <PrivateHeader title="Dashboard"/>
        <div  className="page-content">
          <OpenNotes/>
        </div>
      </div>
    );
  }
}
