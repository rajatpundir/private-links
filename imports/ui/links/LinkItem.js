import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import Clipboard from 'clipboard';
import moment from 'moment';

export default class LinkItem extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      justCopied: false,
      justDeleted: false
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
    if(!this.state.justDeleted) {
      // If the item was removed, this.clipbaord.destroy() will not work.
      this.clipboard.destroy();
    }
  }
  renderStats() {
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMessage = null;
    if (typeof this.props.lastVisitedAt === 'number') {
      // lastVisitedAt was null intially.
      visitedMessage = `(visited ${ moment (this.props.lastVisitedAt).fromNow() })`;
    }
    return <p>{this.props.visitedCount} {visitMessage}</p>;
  }
  render() {
    return(
      <div>
        <h2>{this.props.url}</h2>
        <p>{this.props.shortUrl}</p>
        {this.renderStats()}
        <a href={this.props.to} target="_blank">Visit</a>
        <a href={this.props.shortUrl} target="_blank">Indirect</a>
        <button ref="copy" data-clipboard-text={this.props.shortUrl}> {this.state.justCopied ? 'Copied' : 'Copy'} </button>
        <button onClick={() => {
          Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
        }}>
          {this.props.visible ? 'Hide' : 'Unhide'}
        </button>
        <button onClick={() => {
          this.state.justDeleted = true;
          Meteor.call('links.remove', this.props._id);
        }}>Delete</button>
      </div>
    );
  }
}
