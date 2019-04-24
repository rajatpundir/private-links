import React from 'react';

export default class NotFound extends React.Component {
  constructor(props) {
    super(props);
    // state management goes here.
  }
  render() {
    return(
      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>404 - Page Not Found</h1>
          <p>We're unable to find that page.</p>
        </div>
      </div>
    );
  }
}
