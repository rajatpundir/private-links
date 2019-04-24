import React from 'react';
import PropTypes from 'prop-types';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Session } from 'meteor/session';
import { Meteor } from 'meteor/meteor';
import { withRouter } from 'react-router-dom';

import { Links } from '../../api/links';

export class LinkEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      shortUrl: '',
      visible: '',
      visitedCount: '',
      lastVisitedAt: '',
      title: '',
      body: ''
    }
  }
  handleUrlChange(e) {
    const url = e.target.value;
    this.setState({ url });
    this.props.call('links.update', this.props.link._id, { url });
  }
  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({ title });
    this.props.call('links.update', this.props.link._id, { title });
  }
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({ body });
    this.props.call('links.update', this.props.link._id, { body });
  }
  handleRemoval() {
    this.props.call('links.remove', this.props.link._id);
    Session.set('selectedLinkId', undefined);
    // History prop was passed by withRouter() below.
    this.props.history.push('/dashboard/links');
  }
  componentDidUpdate(prevProps, prevState) {
    // Will be called when state or props changes.
    // Change state of component if selectedLinkId was changed(new item was selected).
    const currentLinkId = this.props.link ? this.props.link._id : undefined;
    const prevLinkId = prevProps.link ? prevProps.link._id : undefined;
    if (currentLinkId && currentLinkId !== prevLinkId) {
      this.setState({
        url: this.props.link.url,
        shortUrl: this.props.link.shortUrl,
        title: this.props.link.title,
        body: this.props.link.body,
        visible: this.props.link.visible,
        visitedCount: this.props.link.visitedCount,
        lastVisitedAt: this.props.link.lastVisitedAt
      });
    }
  }
  render() {
    if (this.props.link) {
      return (
        <div className="editor">
          <input className="editor__title" value={this.state.url} placeholder="Untitled URL" onChange={this.handleUrlChange.bind(this)} />
          <input className="editor__title" value={this.state.title} placeholder="Untitled Link" onChange={this.handleTitleChange.bind(this)} />
          <textarea className="editor__body" value={this.state.body} placeholder="Your Link here" onChange={this.handleBodyChange.bind(this)}></textarea>
          <div>
            <button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Link</button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedLinkId ? 'Link not found.' : 'Pick or create a link to get started.'}
          </p>
        </div>
      );
    }
  }
};

LinkEditor.propTypes = {
  Link: PropTypes.object,
  selectedLinkId: PropTypes.string,
  call: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  Session: PropTypes.object.isRequired
};

// withRouter() will pass updated match, location, and history props to the wrapped component whenever it renders.
export default withRouter(createContainer(() => {
  const selectedLinkId = Session.get('selectedLinkId');
  let shortUrl = undefined;
  if(Links.findOne(selectedLinkId)) {
    shortUrl = '/dashboard/links' + selectedLinkId;
  }
  return {
    selectedLinkId,
    shortUrl,
    link: Links.findOne(selectedLinkId),
    call: Meteor.call,
    Session
  };
}, LinkEditor));
