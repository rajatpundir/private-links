import React from 'react';
import PropTypes from 'prop-types';
import PrivateHeader from './generic/PrivateHeader';
import Links from './links/Links';
import Notes from './notes/Notes';
import { browserHistory } from '../routes/AppRouter';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    if(browserHistory.location.pathname === '/dashboard'){
      browserHistory.replace('/dashboard/notes');
    }
  }
  render() {
    return(
      <div>
        <PrivateHeader title="Dashboard"/>
        <div  className="page-content">
          {(browserHistory.location.pathname === '/dashboard/links') ? <Links/>: <Notes/>}
        </div>
      </div>
    );
  }
}
