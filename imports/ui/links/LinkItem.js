import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import Clipboard from 'clipboard';
import moment from 'moment';

export class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      justCopied: false
    };
  }
  componentDidMount() {
    this.clipbaord = new Clipboard(this.refs.copy);
    // Chaining events onto clipbaord object.
    this.clipbaord.on('success', () => {
      this.setState({ justCopied: true });
      setTimeout(() => this.setState({ justCopied: false }), 1000);
    }).on('error', ()=> {
      // All browsers may not support copying.
      alert('Unable to copy. Please manually copy the link.');
    })
  }
  componentWillUnmount() {
    // Free resources acquired by clipbaord.
    this.clipbaord.listener.destroy();
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number') {
      // lastVisitedAt was null intially.
      visitedMessage = `(visited ${ moment (this.props.lastVisitedAt).fromNow() })`;
    }
    return <p className="item__message">{this.props.visitedCount} {visitMessage}</p>;
  }
  render() {
    return(
      <div className="item item__link" onClick={() => {this.props.Session.set('selectedLinkId', this.props._id);}}>
        <h3>{this.props.url}</h3>
        <p className="item__message">{this.props.shortUrl}</p>
        {this.renderStats()}
        <p className="item__subtitle">Last updated at { moment(this.props.updatedAt).format('M/DD/YY') }</p>
        <a className="button button--pill button--link" href={this.props.url} target="_blank">Visit</a>
        <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Indirect</a>
        <button className="button button--pill button--link" ref="copy" data-clipboard-text={this.props.shortUrl}> {this.state.justCopied ? 'Copied' : 'Copy'} </button>
        <button className="button button--pill" onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
      </div>
    );
  }
}

export default createContainer(() => {
  return { Session };
}, LinkItem);
