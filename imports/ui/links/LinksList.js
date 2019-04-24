import React from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

import { Links } from '../../api/links';
import LinkItem from './LinkItem';

export class LinksList extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      links: []
    };
  }
  componentDidMount(){
    this.linksTracker = Tracker.autorun(() => {
      Meteor.subscribe('links');
      const links = Links.find({}).fetch();
      this.setState({ links });
    });
  }
  componentWillUnmount() {
    // Stop the tracker when component is no longer visible on screen.
    this.linksTracker.stop();
  }
  renderLinksListItems() {
    if(this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found</p>
        </div>
      );
    }
    return this.state.links.map((link) => {
      // Meteor.absoluteUrl returns id appended with domain.
      const shortUrl = Meteor.absoluteUrl(link._id)
      return <LinkItem key={link._id} shortUrl ={shortUrl} {...link}/>
    });
  }
  render() {
    return(
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    call: Meteor.call
  };
}, LinksList);
