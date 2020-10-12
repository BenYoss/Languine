import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import query from 'query-string';
import { getFiles } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

function Profile({ user }) {
  const [files, setFiles] = useState([]);
  const { id } = query.parse(window.location.search);

  useEffect(() => {
    getFiles(id)
      .then((fileData) => {
        setFiles(fileData);
        console.log(fileData[1].filetext);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container justify-content-center">
      <div className="col-lg-10 col-sm-13">
        <div className="card hovercard">
          <div className="cardheader" />
          <div className="avatar">
            <img alt="" src={user.thumbnail} />
          </div>
          <div className="info">
            <div className="title">
              <p>{user.username}</p>
            </div>
            <div className="desc">{user.description}</div>
          </div>
          <div className="bottom">
            <div className="btn btn-primary btn-twitter btn-sm">
              <p>
                <img src="https://www.flaticon.com/svg/static/icons/svg/61/61027.svg" width="20" height="20" />
                {`  ${user.language}`}
              </p>
            </div>
          </div>
          <div className="file-list-map">
            {files.length ? (
              files.map((file) => (
                <div className="file" key={Math.random()}>
                  <p>{file.title}</p>
                  <p>{`${file.size} kb`}</p>
                  <p>{file.timestamp.slice(0, 10)}</p>
                  <Nav.Link className="file-btn" href={`/file?id=${file._id}`} placment="center">
                    <p>Check PDF</p>
                  </Nav.Link>
                </div>
              ))
            ) : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
