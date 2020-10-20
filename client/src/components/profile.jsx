import React, { useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import query from 'query-string';
import { getFiles, deleteFile } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/profile.css';

const bgImage = 'https://www.featurepics.com/StockImage/20061128/sycamore-maple-leaf-background-stock-picture-150767.jpg';
function Profile({ user }) {
  const [files, setFiles] = useState([]);
  const { id } = query.parse(window.location.search);

  useEffect(() => {
    getFiles(id)
      .then((fileData) => {
        setFiles(fileData);
        console.log(fileData[1].filetext);
        const test = document.getElementById('cardheader');
        console.log(test);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container justify-content-center">
      <div className="col-lg-10 col-sm-13">
        <div className="card hovercard">
          <div className="cardheader" style={{ imageBG: bgImage }} />
          <div className="avatar">
            <img alt="" src={user.thumbnail} />
          </div>
          <div className="info">
            <div className="title">
              <p>{user.username}</p>
            </div>
            <div className="desc">{user.description}</div>
            <p className="text-between">
              <img src="https://www.flaticon.com/svg/static/icons/svg/61/61027.svg" width="20" height="20" />
              {`  ${user.language}`}
            </p>
          </div>
          <div className="bottom">
            <h3 className="text-white btn-primary">My Translated PDF&apos;s</h3>
          </div>
          <div className="file-list-map d-flex align-items-center flex-column">
            {files.length ? (
              files.map((file) => (
                <div className="file col-lg-5" width="200" key={Math.random()}>
                  <div className="card text-black bg-light my-5 py-4 text-center">
                    <div className="card-body">
                      <div>
                        <button
                          className="d-flex justify-content-start"
                          type="submit"
                          onClick={() => deleteFile(file._id).then(() => window.location.reload())
                            .catch((err) => console.error(err))}
                        >
                          x
                        </button>
                      </div>
                      <div className="card-title">
                        <p>{file.title}</p>
                      </div>
                      <div className="card-text">
                        <p>{`${file.size} kb`}</p>
                        <p>{file.timestamp.slice(0, 10)}</p>
                      </div>
                    </div>
                    <div className="card-footer">
                      <Nav.Link className="file-btn" href={`/file?id=${file._id}`} placment="center">
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

export default Profile;
