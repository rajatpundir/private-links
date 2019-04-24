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
      <div className={this.props.selected ? 'item item--selected' : 'item'} onClick={() => {this.props.Session.set('selectedLinkId', this.props._id);}}>
        <h3>{this.props.title}</h3>
        <p className="item__message">{this.props.url}</p>
        {this.renderStats()}
        <p className="item__subtitle">{ moment(this.props.updatedAt).format('D-MMM-YY h:mm A') }</p>
        <div className="button__zone">
          { this.props.url === '' ? undefined : <a className="button button--pill button--link" href={this.props.shortUrl} target="_blank">Visit</a> }
          { this.props.source === '' ? undefined: <a className="button button--pill button--link" href={this.props.source} target="_blank">Source</a> }
          <button className="button button--pill button--link" ref="copy" data-clipboard-text={this.props.shortUrl}> {this.state.justCopied ? 'Copied' : 'Copy'} </button>
          <button className="button button--pill" onClick={() => {
            Meteor.call('links.setVisibility', this.props._id, !this.props.visible);
          }}>
            {this.props.visible ? 'Finish' : 'Unfinish'}
          </button>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return { Session };
}, LinkItem);
