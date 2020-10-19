import React, { useState } from 'react';
import axios from 'axios';
import { FilePond } from 'react-filepond';
import 'filepond/dist/filepond.min.css';

function Bucket({ sendMessage }) {
  const [fileCollection, setFiles] = useState([]);

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
      if (res.data.includes('.gif') || res.data.includes('.jpg') || res.data.includes('.png')) {
        console.log(res.data, 'this is the data');
        sendMessage(res.data);
      }
    }).catch((err) => console.error(err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <button className="btn btn-primary" type="submit">Upload</button>
        </div>
        <div className="filepond-wrapper">
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

export default Bucket;
