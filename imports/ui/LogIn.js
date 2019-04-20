import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker, createContainer } from 'meteor/react-meteor-data';

export class LogIn extends React.Component {
  constructor(props) {
    super(props);
    // state - management goes here.
    this.state = {
      error: '',
      email: '',
      password: ''
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    // Create the user and redirect accordingly or update the error state.
    let {email, password} = this.state;
    // Prevent full page refresh with click of Submit button.
    e.preventDefault();
    this.props.loginWithPassword({ email }, password, (err) => {
      console.log(err)
      if(err) {
        this.setState({ error : 'Unable to login.'})
      } else {
        // Login was successful, no errors or clear any errors.
        console.log('Login successful.')
        this.setState({ error : ''})
      }
    });
  }
  onEmailChange(e) {
    // Change email state of component
    this.setState({ email : e.target.value.trim() });
  }
  onPasswordChange(e) {
    // Change password state of component
    this.setState({ password : e.target.value.trim() });
  }
  render() {
    return(
      // React Component can have only one root element.
      <div>
        <p>LogIn Component</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} value={this.state.email} />
          <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} />
          <button>Login</button>
        </form>
        <Link to="/signup">Need an account?</Link>
      </div>
    );
  }
}

// container to wrap the above presentational container.
// function/data here is tracked and rendered on change.
// functions that are to be mocked should be passed here as props.
export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, LogIn);
