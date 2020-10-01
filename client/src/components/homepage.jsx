import React, { useEffect, useState } from 'react';
import { getUser } from '../helpers/helpers';

function Homepage() {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser()
      .then((userInfo) => {
        setUser(userInfo);
      });
  }, []);

  return (
    <div>
      <h1>This will be the homepage</h1>
      <a className="login-google-btn" href="/login">
        <h1>Login with google?</h1>
      </a>
      {
              user
                ? (
                  <div>
                    <h2>
                      {user.username || 'Log in first'}
                      :
                      <img src={user.thumbnail} alt="" />
                    </h2>
                    <a className="join-btn" href="/join">
                      <h1>Join a room</h1>
                    </a>
                  </div>

                )
                : <h1>Nope</h1>
        }
    </div>
  );
}

export default Homepage;
