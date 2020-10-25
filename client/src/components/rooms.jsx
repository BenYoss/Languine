/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Nav, Collapse, Modal, Button,
} from 'react-bootstrap';
import { getRooms, getAccount } from '../helpers/helpers';
import '../styles/rooms.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RoomAuth from './roomAuth';

const counter = {};
const opener = {};
const roomOpener = {};
const authOpener = {};

function RoomList({ users }) {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState('');
  const [usersIds, setUsersIds] = useState([]);
  const [usersNames, setUsersNames] = useState([]);
  const [, setReload] = useState([]);

  useEffect(() => {
    getRooms()
      .then((roomData) => {
        setRooms(roomData);
        getAccount()
          .then((userInfo) => {
            if (!userInfo) {
              window.location.href = '/404';
            }
            setUser(userInfo);
          });
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log(users);
    users.forEach((roomuser) => {
      const idStorage = usersIds;
      const nameStorage = usersNames;
      idStorage.push(roomuser.id_room);
      nameStorage.push(roomuser);
      setUsersIds(idStorage);
      setUsersNames(nameStorage);
    });
  }, [users]);

  useEffect(() => {
    rooms.forEach((room) => {
      const { _id } = room;
      if (!counter[`${room.name}`]) {
        counter[`${room.name}`] = 0;
      }
      opener[`${_id}`] = false;
      authOpener[`${_id}`] = false;
      roomOpener[`${_id}`] = false;
      if (usersIds.length) {
        usersIds.forEach((idUser) => {
          if (idUser === _id) {
            counter[`${room.name}`] += 1;
          }
        });
      }
    });
  }, [rooms]);

  return (
    <div className="d-flex card roomListContainer flex-column">
      <h1 className="card-header bg-dark text-white d-flex join-header justify-content-center variant-dark">Room List</h1>
      <div className="roomListInnerContainer pl-5 pr-5">
        {rooms.length
          ? rooms.map((room) => {
            const { _id } = room;
            return (
              <div>
                <div
                  className="pl-5 pr-5 room"
                  key={_id}
                  onClick={() => {
                    roomOpener[`${_id}`] = !roomOpener[`${_id}`]; setReload([]);
                  }}
                  onKeyDown={() => {}}
                >
                  <div>
                    {
                    !room.is_public ? (
                      <div>
                        <h3>
                          <img className="roomDesc" src="https://www.pointcare.com/wp-content/uploads/2018/12/lock-icon.png" alt="" width="40" height="40" />
                          {room.name}
                        </h3>
                      </div>
                    ) : (
                      <h3>{room.name}</h3>
                    )
                  }
                  </div>
                </div>
                <div>
                  <Collapse in={roomOpener[`${_id}`]}>
                    <div className="card">
                      <div className="card-header">
                        <h3 className="roomDesc d-flex justify-content-center">{room.name}</h3>
                        <div className="d-flex justify-content-center">
                          <Button className="btn-dark rounded" type="submit" onClick={() => { opener[`${_id}`] = !opener[`${_id}`]; setReload([]); }}>
                            {'Users '}
                            <span className="badge badge-light" style={{ marginLeft: '10px' }}>{counter[`${room.name}`] ? counter[`${room.name}`] : '0'}</span>
                          </Button>
                          <Collapse in={opener[`${_id}`]} key={_id}>
                            <div>
                              {usersNames.length ? (
                                usersNames.map((userName) => {
                                  if (userName.id_room === _id) {
                                    return (
                                      <p>{userName.username}</p>
                                    );
                                  }
                                  return '';
                                })
                              ) : ''}
                            </div>
                          </Collapse>
                        </div>
                      </div>
                      <div className="card-body">
                        <h4 className="roomDesc d-flex justify-content-center">{room.description}</h4>
                      </div>
                      <div className="card-footer">
                        <div>
                          {!room.is_public ? (
                            <div className="roomDesc">
                              <div className="roomDesc d-flex justify-content-center">
                                <Button onClick={() => { authOpener[`${_id}`] = !authOpener[`${_id}`]; setReload([]); }}>
                                  <h3 className="roomDesc d-flex justify-content-center">Join Room</h3>
                                </Button>
                              </div>
                              <Modal show={authOpener[`${_id}`]} onHide={() => { authOpener[`${_id}`] = !authOpener[`${_id}`]; setReload([]); }} aria-labelledby="contained-modal-title-vcenter" centered>
                                <Modal.Header closeButton>
                                  <Modal.Title id="contained-modal-title-vcenter">
                                    Enter Password
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <RoomAuth
                                    room={room.name}
                                    userId={user.id_google}
                                    user={user.username}
                                  />
                                </Modal.Body>
                                <Modal.Footer />
                              </Modal>
                            </div>
                          ) : (
                            <div className="roomDesc d-flex justify-content-center">
                              <Nav.Link style={{ color: 'black' }} href={`/discussion?name=${user.id_google}&room=${room.name}&user=${user.username}`}>
                                <Button><h3 className="roomDesc d-flex justify-content-center">Join Room</h3></Button>
                              </Nav.Link>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Collapse>
                </div>
              </div>
            );
          })
          : (
            <div>
              <h1>Sorry, but there are no rooms as of yet...</h1>
            </div>
          )}
      </div>
    </div>
  );
}

RoomList.propTypes = {
  users: PropTypes.element.isRequired,
};

export default RoomList;
