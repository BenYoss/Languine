import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import query from 'query-string';
import { getFiles, deleteFile } from '../../helpers/helpers';
import UserRooms from './UserRooms';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/profile.css';
import img from '../../img/translator-img.png';

const bgImage = 'https://www.featurepics.com/StockImage/20061128/sycamore-maple-leaf-background-stock-picture-150767.jpg';
function Profile({ user }) {
  const [files, setFiles] = useState([]);
  const { id } = query.parse(window.location.search);

  useEffect(() => {
    getFiles(id)
      .then((fileData) => {
        setFiles(fileData);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container">
      <div className="col-lg-13">
        <div className="card hovercard">
          <div className="cardheader" style={{ backgroundImage: bgImage }} />
          <div className="avatar">
            <img alt="thumbnail of user" src={user.thumbnail} />
          </div>
          <div className="info">
            <div className="title">
              <p>{user.username}</p>
            </div>
            <p className="text-between">
              <img src={img} alt="icon for user language" width="20" height="20" />
              {`  ${user.language}`}
            </p>
          </div>
          <div className="user-rooms">
            {user && <UserRooms user={user} />}
          </div>
          <div className="bottom">
            {files.length ? <h3 className="text-white btn-secondary">My Translated PDF&apos;s</h3> : ''}
          </div>
          <div className="file-list-map d-flex align-items-center flex-column">
            {files.length ? (
              files.map(({
                title, _id, size, timestamp,
              }) => (
                <div className="file col-lg-8" width="200" key={Math.random()}>
                  <div className="card text-black bg-light my-5 py-4 text-center">
                    <div>
                      <button
                        className="d-flex justify-content-start"
                        type="submit"
                        onClick={() => {
                          deleteFile(_id).then(() => window.location.reload())
                            .catch((err) => console.error(err));
                        }}
                      >
                        x
                      </button>
                    </div>
                    <div className="card-header bg-secondary text-white">
                      <p>{title}</p>
                    </div>
                    <div className="card-body">
                      <div className="card-text">
                        <p>{`${size} kb`}</p>
                        <p>{timestamp.slice(0, 10)}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <Nav.Link className="file-btn" href={`/file?id=${_id}`} placment="center">
                        <p>Check PDF</p>
                      </Nav.Link>
                    </div>
                  </div>
                </div>
              ))
            ) : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

Profile.propTypes = {
  user: PropTypes.element.isRequired,
};

export default Profile;
