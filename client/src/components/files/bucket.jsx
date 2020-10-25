import React, { useState } from 'react';
import axios from 'axios';
import { FilePond } from 'react-filepond';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import 'filepond/dist/filepond.min.css';

function Bucket({ sendMessage }) {
  const [fileCollection, setFiles] = useState([]);
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
      console.log(res.data);
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
    }).catch((err) => console.error(err));
  };

  return (
    <div className="card">
      <form onSubmit={onSubmit}>
        <Route path="/fileupload">
          <h1 className="card-header bg-dark text-white d-flex join-header justify-content-center variant-dark">Upload PDF</h1>
        </Route>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Upload</button>
        </div>
        <div className="filepond-wrapper form-group">
          <FilePond
            files={fileCollection}
            server={null}
            instantUpload={false}
            onupdatefiles={(fileItems) => onFileChange(fileItems)}
          />
        </div>
      </form>
    </div>
  );
}

Bucket.propTypes = {
  sendMessage: PropTypes.element.isRequired,
};

export default Bucket;
