import React from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

export class OpenPrivateHeader extends React.Component {
  render() {
    const navImageSrc = this.props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    return (
      <div className="header">
        <div  className="header__content">
          <img className="header__nav-toggle" src={navImageSrc} onClick={this.props.handleNavToggle}/>
          <h1 className="header__title">{this.props.title}</h1>
        </div>
      </div>
    );
  }
};

OpenPrivateHeader.propTypes = {
  title: PropTypes.string.isRequired
};

export default createContainer(() => {
  return {
    handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
    isNavOpen: Session.get('isNavOpen')
  };
}, OpenPrivateHeader);
