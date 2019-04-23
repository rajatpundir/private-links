import React from 'react';
import PropTypes from 'prop-types';
import PrivateHeader from './PrivateHeader';
import Links from './links/Links';
import Notes from './notes/Notes';
import { browserHisistory } from '../routes/AppRouter';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    if(browserHisistory.location.pathname === '/dashboard'){
      browserHisistory.replace('/dashboard/notes');
    }
  }
  toggleMode() {
    if(browserHisistory.location.pathname === '/dashboard/links'){
      browserHisistory.replace('/dashboard/notes');
    } else if(browserHisistory.location.pathname === '/dashboard/notes') {
      browserHisistory.replace('/dashboard/links');
    }
  }
  render() {
    return(
      <div>
        <PrivateHeader title="Dashboard"/>
        <button onClick={this.toggleMode.bind(this)}>Toggle Mode</button>
        {(browserHisistory.location.pathname === '/dashboard/links') ? <Links/>: <Notes/>}
      </div>
    );
  }
}
