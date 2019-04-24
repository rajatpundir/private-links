import React from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory } from '../../routes/AppRouter';

export class PrivateHeader extends React.Component {
  toggleMode() {
    if(browserHistory.location.pathname.startsWith('/dashboard/links')) {
      const selectedNoteId = Session.get('selectedNoteId')
      if(selectedNoteId) {
        browserHistory.replace('/dashboard/notes/' + selectedNoteId);
      } else {
        browserHistory.replace('/dashboard/notes');
      }
    } else if(browserHistory.location.pathname.startsWith('/dashboard/notes')) {
      const selectedLinkId = Session.get('selectedLinkId')
      if(selectedLinkId) {
        browserHistory.replace('/dashboard/links/' + selectedLinkId);
      } else {
        browserHistory.replace('/dashboard/links');
      }
    }
  }
  // Put it inside render()
  //<button className="button button--link-text" onClick={this.toggleMode.bind(this)}>Toggle Mode</button>
  render() {
    const navImageSrc = this.props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    return (
      <div className="header">
        <div  className="header__content">
          <img className="header__nav-toggle" src={navImageSrc} onClick={this.props.handleNavToggle}/>
          <h1 className="header__title">{this.props.title}</h1>
          <button className="button button--link-text" onClick={() => this.props.handleLogout()}>Logout</button>
        </div>
      </div>
    );
  }
};

PrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default createContainer(() => {
  return {
    handleLogout: () => Accounts.logout(),
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, PrivateHeader);
