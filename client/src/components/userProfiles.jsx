import React, { useState, useEffect } from 'react';
import query from 'query-string';
import { getUser } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserProfiles() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { id } = query.parse(window.location.search);
    console.log(id);
    getUser(id)
      .then((userData) => {
        setUser(userData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {
      user.length ? (
        <div className="container justify-content-center">
          <div className="col-lg-10 col-sm-13">
            <div className="card hovercard">
              <div className="cardheader" />
              <div className="avatar">
                <img alt="" src={user[0].thumbnail} />
              </div>
              <div className="info">
                <div className="title">
                  <p>{user[0].username}</p>
                </div>
                <div className="desc">{user[0].description}</div>
              </div>
              <div className="bottom">
                <div className="btn btn-primary btn-twitter btn-sm">
                  <p>
                    <img src="https://www.flaticon.com/svg/static/icons/svg/61/61027.svg" width="20" height="20" alt="" />
                    {`  ${user[0].language}`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : 'Loading'
    }
    </div>
  );
}

export default UserProfiles;
