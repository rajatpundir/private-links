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
      _id: '',
      url: '',
      visible: false,
      visitedCount: '',
      lastVisitedAt: '',
      title: '',
      source: '',
      context: ''
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
  handleSourceChange(e) {
    const source = e.target.value;
    this.setState({ source });
    this.props.call('links.update', this.props.link._id, { source });
  }
  handleContextChange(e) {
    const context = e.target.value;
    this.setState({ context });
    this.props.call('links.update', this.props.link._id, { context });
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
        _id: this.props.link._id,
        url: this.props.link.url,
        title: this.props.link.title,
        source: this.props.link.source,
        context: this.props.link.context,
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
          <input className="editor__title" value={this.state.title} placeholder="Title" onChange={this.handleTitleChange.bind(this)} />
          <textarea className="editor__body" value={this.state.context} placeholder="Context" onChange={this.handleContextChange.bind(this)}></textarea>
          <input className="editor__subtitle" value={this.state.source} placeholder="Source" onChange={this.handleSourceChange.bind(this)} />
          <input className="editor__subtitle" value={this.state.url} placeholder="Destination" onChange={this.handleUrlChange.bind(this)} />
          <div>
            {this.state.source === '' ? (<button className="button button--secondary" onClick={this.handleRemoval.bind(this)}>Delete Link</button>) : undefined}
          </div>
        </div>
      );
    } else {
      return (
        <div className="editor">
          <p className="editor__message">
            {this.props.selectedLinkId ? 'Link not found.' : 'Select a link to get started.'}
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
  const link = Links.findOne(selectedLinkId);
  return {
    selectedLinkId,
    link,
    call: Meteor.call,
    Session
  };
}, LinkEditor));
