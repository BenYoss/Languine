import React from 'react';
import PropTypes from 'prop-types';

function Homepage({ user }) {
  return (
    <div>
      {user ? (
        <h1>
          Welcome!
          {user.username}
        </h1>
      ) : ''}
      <h1>This will be the homepage</h1>
    </div>
  );
}

Homepage.propTypes = {
  user: PropTypes.element.isRequired,
};

export default Homepage;
