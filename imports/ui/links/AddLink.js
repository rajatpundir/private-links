import React from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

export class AddLink extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }
  onSubmit(e) {
    const {url} = this.state;
    e.preventDefault();
    this.props.call('links.insert', url, (err, res) => {
      if(!err) {
        // Close Modal if it was shown.
        this.setState({error : ''});
        this.handleModalClose();
      } else {
        this.setState({error : err.reason});
      }
    });
  }
  onChange(e) {
    // Preserves form state as component state
    this.setState( {
      url: e.target.value
    });
  }
  handleModalClose() {
    this.setState({
      isOpen: false,
      url: '',
      error: ''
    });
  }
  render() {
    return(
      <div className="item-list__header">
        <button className="button" onClick={() => this.setState({isOpen: true})}>Create Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          ariaHideApp={false}
          overlayClassName="boxed-view boxed-view--modal">
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form onSubmit={this.onSubmit.bind(this)}  className="boxed-view__form">
              <input type="text" placeholder="URL" ref="url" value={this.state.url} onChange={this.onChange.bind(this)}/>
              <button className="button">Add Link</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    call: Meteor.call
  };
}, AddLink);
