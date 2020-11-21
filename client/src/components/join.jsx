/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import crypto from 'crypto-js';
import { Collapse, Button } from 'react-bootstrap';
import { getAccount, addPassword, hash } from '../helpers/helpers';
import 'bootstrap/dist/css/bootstrap.min.css';

function Join() {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [pass, setPass] = useState('');
  const [desc, setDesc] = useState('');
  const [pub, setPub] = useState(true);

  useEffect(() => {
    getAccount()
      .then((userInfo) => {
        setUser(userInfo);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="card join-outer-container col-lg-13 pb-30" style={{ marginLeft: '100px' }}>
      <div className="join-inner-container">
        <h1 className="card-header bg-dark text-white d-flex join-header justify-content-center variant-dark">Create Room</h1>
        <div>
          <label>Insert a name:</label>
          <input placeholder="Roomname" className="Room-Input form-control" type="text" onChange={(ev) => setRoom(ev.target.value)} />
          <label>Room Description:</label>
          <textarea placeholder="Description" className="Desc-Input form-control at-20" type="text" onChange={(ev) => setDesc(ev.target.value)} />
          <h4>Set public?</h4>
          <Button type="Button" onClick={() => setPub(!pub)}>{`${pub}`}</Button>
          <div>
            <div>
              <Collapse className="pt-3 pb-4 col-lg-8" in={!pub}>
                <div>
                  <p>Create a password</p>
                  <input placeholder="Password" className="Room-Input form-control" type="password" onChange={(ev) => setPass(ev.target.value)} />
                </div>
              </Collapse>
            </div>
          </div>
          <div className="d-flex join-header justify-content-center variant-dark">
            <Button
              type="submit"
              onClick={() => {
                if (pass) {
                  addPassword(hash(pass), room).then(() => {
                    setTimeout(() => { window.location.href = `/discussion?name=${user.id_google}&room=${crypto.enc.Base64.parse(crypto.AES.encrypt(room, 'room').toString()).toString(crypto.enc.Hex)}&user=${user.username}&desc=${desc}&pub=${pub}`; }, 1000);
                  });
                } else {
                  window.location.href = `/discussion?name=${user.id_google}&room=${crypto.enc.Base64.parse(crypto.AES.encrypt(room, 'room').toString()).toString(crypto.enc.Hex)}&user=${user.username}&desc=${desc}&pub=${pub}`;
                }
              }}
            >
              Create Room
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Join;
