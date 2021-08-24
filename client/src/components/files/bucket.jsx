import React, { useState } from 'react';
import axios from 'axios';
import { FilePond } from 'react-filepond';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'filepond/dist/filepond.min.css';
import { Collapse } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

let warnCollapsed = true;

function Bucket({ sendMessage }) {
  const [fileCollection, setFiles] = useState([]);
  const [isUploaded, setUploaded] = useState(false);
  const [, setReload] = useState([]);
  const imageTypes = ['.gif', '.png', '.jpg', '.tiff', '.eps'];
  const videoTypes = ['.mp4', '.mov', '.wmv', '.webm', '.ogg', '.mkv'];

  const onFileChange = (files) => {
    const items = files.map((fileItem) => fileItem.file);
    setFiles([...fileCollection, items]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fileUpload', fileCollection[0][0], fileCollection[0][0].name);
    axios.post('api/bucket', formData, { headers: { 'Content-Type': 'multipart/form-data' } }, {
    }).then((res) => {
      imageTypes.forEach((imgType) => {
        if (res.data.includes(imgType)) {
          sendMessage(res.data);
        }
      });
      videoTypes.forEach((vidType) => {
        if (res.data.includes(vidType)) {
          sendMessage(res.data);
        }
      });
      if (res.data.includes('.pdf')) {
        setUploaded(true);
      }
    }).catch((err) => console.error(err));
  };

  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <Route path="/fileupload">
          <h1 className="card-header bg-dark text-white d-flex join-header justify-content-center variant-dark">Upload PDF</h1>
          <Collapse in={warnCollapsed}>
            <div className="alert alert-danger">
              <button type="button" className="alert-danger" onClick={() => { warnCollapsed = false; setReload([]); }}>x</button>
              <h3>Warning!</h3>
              <h4>
                the PDF upload feature requires the CORS
                chrome extension to display translated PDFS.
              </h4>
              <a href="https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en">Link to CORS extension</a>
            </div>
          </Collapse>
        </Route>
        <div className="form-group">
          <button className="btn btn-dark" type="submit">Upload</button>
        </div>
        <div className="filepond-wrapper form-group">
          <FilePond
            files={fileCollection}
            server={null}
            instantUpload={false}
            onupdatefiles={(fileItems) => onFileChange(fileItems)}
          />
          {
            isUploaded ? (
              <h3>File has been uploaded!</h3>
            ) : ''
          }
        </div>
      </form>
    </div>
  );
}

Bucket.propTypes = {
  sendMessage: PropTypes.element.isRequired,
};

export default Bucket;
