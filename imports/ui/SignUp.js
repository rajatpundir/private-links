import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withTracker, createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
    this.state = {
      error: '',
      email: '',
      password: ''
    };
  }
  onSubmit(e) {
    // Create the user and redirect accordingly or update the error state.
    let {email, password} = this.state;
    // Prevent full page refresh with click of Submit button.
    e.preventDefault();
    if (password.length < 8) {
      return this.setState({ error : 'Password must be more than 8 characters long.'})
    }
    this.props.createUser({ email, password }, (err) => {
      if(err) {
        this.setState({ error : err.reason});
      } else {
        // User creation was successful, no errors or clear any errors.
        this.setState({ error : ''});
      }
    })
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
        <p>SignUp Component</p>
        {this.state.error ? <p>{this.state.error}</p> : undefined}
        <form onSubmit={this.onSubmit.bind(this)} noValidate>
          <input type="email" name="email" placeholder="Email" onChange={this.onEmailChange.bind(this)} value={this.state.email} />
          <input type="password" name="password" placeholder="Password" onChange={this.onPasswordChange.bind(this)} value={this.state.password} />
          <button >Create Account</button>
        </form>
        <Link to="/">Have an account?</Link>
      </div>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired
};

// container to wrap the above presentational container.
// function/data here is tracked and rendered on change.
// functions that are to be mocked should be passed here as props.
export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  };
}, SignUp);
