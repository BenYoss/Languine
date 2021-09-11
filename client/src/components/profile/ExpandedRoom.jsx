/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import crypto from 'crypto-js';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateRoom, updatePassword } from '../../helpers/helpers';
import '../../styles/profile.css';
import '../../styles/join.css';

export default function ExpandedRoom({ room }) {
  const [pub, setPub] = useState(false);
  const [options, setOptions] = useState({});
  const [newPassword, setPassword] = useState('');

  const { _id: id } = room;

  useEffect(() => {
    setPub(room.is_public);
  }, []);

  return (
    <>
      <div className="edit-room-header">
        <h4>Edit Room:</h4>
      </div>
      <section className="edit-room-inputs">
        <label>Change description:</label>
        <input className="form-control" type="text" value={options.description} onChange={(event) => setOptions({ ...options, description: event.target.value })} placeholder="This is the best room in the world!" />
      </section>
      <section className="edit-room-inputs">
        <label>Change name:</label>
        <input className="form-control" type="text" value={options.name} onChange={(event) => setOptions({ ...options, name: event.target.value })} placeholder="Bob's Dojo" />
      </section>
      <section>
        <label>Make room public:</label>
        <br />
        <label className="switch">
          <input type="checkbox" checked={pub} onClick={() => { setPub(!pub); setOptions({ ...options, is_public: !room.is_public }); }} />
          <span className="slider round" />
        </label>
      </section>
      {!room.is_public && (
        <section className="edit-room-inputs">
          <label>Change password:</label>
          <input className="form-control" value={options.name} onChange={(event) => setPassword(event.target.value)} type="text" placeholder="******" />
        </section>
      )}
      <div className="edit-room-submit">
        <Button
          className="btn-dark"
          type="submit"
          onClick={() => {
            if (newPassword.length) {
              const encryptedPass = crypto.AES.encrypt(newPassword, 'test').toString();
              updatePassword(room.name, { password: encryptedPass });
            }
            updateRoom(id, options).then(() => window.location.reload());
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
}

ExpandedRoom.propTypes = {
  room: PropTypes.element.isRequired,
};
