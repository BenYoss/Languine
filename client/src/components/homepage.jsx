import React, { useEffect, useState } from 'react';
import { getUser } from '../helpers/helpers';

function Homepage() {
  const [user, setUser] = useState('');

  useEffect(() => {
    getUser()
      .then((userInfo) => {
        setUser(userInfo);
        window.language = userInfo.language;
      });
  }, []);

  return (
    <div>
      <h1>This will be the homepage</h1>
    </div>
  );
}

export default Homepage;
