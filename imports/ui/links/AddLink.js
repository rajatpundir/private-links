import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

export class AddLink extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      url: '',
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
  render() {
    return(
      <div>
        <h1>Add Link</h1>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)}>
            <input type="text" placeholder="URL" value={this.state.url} onChange={this.onChange.bind(this)}/>
            <button>Add Link</button>
        </form>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    call: Meteor.call
  };
}, AddLink);
