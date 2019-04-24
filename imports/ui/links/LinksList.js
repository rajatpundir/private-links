import React from 'react';
import FlipMove from 'react-flip-move';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { browserHistory } from '../../routes/AppRouter';
import SimpleSchema from 'simpl-schema';

import { Links } from '../../api/links';
import LinkItem from './LinkItem';

export class LinksList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="item-list">
        {this.props.links.length === 0 ? <p className="empty-item">Select or create a link to get started!</p> : undefined }
        <FlipMove maintainContainerHeight={true}>
          {this.props.links.map((link) => {
            const shortUrl = Meteor.absoluteUrl(link._id)
            return<LinkItem key={link._id} shortUrl ={shortUrl} {...link}/>;
          })}
        </FlipMove>
      </div>
    );
  }
}

LinksList.propTypes = {
  links: PropTypes.array.isRequired
};

export default createContainer(() => {
  Meteor.subscribe('links');
  let selectedLinkId = Session.get('selectedLinkId');
  const linkId = browserHistory.location.pathname.split("/")[3];
  if(linkId) {
    new SimpleSchema({
      linkId: {
        type: String,
        min: 1
      }
    }).validate({ linkId });
    if(Links.findOne(linkId)) {
      Session.set('selectedLinkId', linkId);
      selectedLinkId = linkId;
    }
  }
  return {
    call: Meteor.call,
    links: Links.find({}, {
      sort: {
        updatedAt: -1
      }
    }).fetch().map((link) => {
      return {
        ...link,
        selected: link._id === selectedLinkId
      };
    })
  };
}, LinksList);
