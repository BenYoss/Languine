import React, { useEffect, useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import PropTypes from 'prop-types';
import crypto from 'crypto-js';
import { getRooms, deleteRoom } from '../../helpers/helpers';
import ExpandedRoom from './ExpandedRoom';

// Icon information from img directory
import deleteIcon from '../../img/delete-icon.png';
import editIcon from '../../img/edit-icon.png';
import joinIcon from '../../img/join-room-icon.png';

// Stylesheets for component
import '../../styles/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const roomToggle = {};

export default function UserRooms({ user }) {
  const [rooms, setRooms] = useState([]);
  const [, setReload] = useState([]);

  useEffect(() => {
    getRooms().then((roomList) => setRooms(roomList.filter((room) => {
      const { _id: id } = room;
      if (room.id_host === user.id_google) {
        roomToggle[`${id}`] = false;
        return room;
      }
      return null;
    }))).catch((err) => console.error(err));
  }, []);

  const deleteRoomInList = async (id) => {
    await deleteRoom(id).then(() => window.location.reload()).catch((err) => console.error(err));
  };

  const editRoom = (id) => {
    roomToggle[`${id}`] = !roomToggle[`${id}`];
    setReload([]);
  };

  const joinRoom = (room) => {
    window.location.href = `/discussion?name=${user.id_google}&room=${crypto.enc.Base64.parse(crypto.AES.encrypt(room.name, 'room').toString()).toString(crypto.enc.Hex)}&user=${user.username}`;
  };

  return (
    <div>
      <section className="room-header">
        <h4>My Room&apos;s</h4>
      </section>
      {rooms.length > 0 ? (
        <section className="room-list">
          {rooms.map((room) => {
            const { _id: id } = room;
            return (
              <Card>
                <Card.Header className="room-list-header">
                  <div className="room-btn-list">
                    <Button className="btn-dark" type="submit" onClick={() => deleteRoomInList(id)}>
                      <img src={deleteIcon} alt="delete a room trashcan" className="room-icon" width="20px" height="20px" />
                    </Button>
                    <Button className="btn-dark" type="submit" onClick={() => editRoom(id)}>
                      <img src={editIcon} alt="edit a room notepad" className="room-icon" width="20px" height="20px" />
                    </Button>
                    <Button className="btn-dark" type="submit" onClick={() => joinRoom(room)}>
                      <img src={joinIcon} alt="join a room door" className="room-icon" width="20px" height="20px" />
                    </Button>
                  </div>
                  <div className="room-title">
                    <h4>{room.name}</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <p>{room.description}</p>
                </Card.Body>
                <Card.Footer>
                  <Collapse in={roomToggle[`${id}`]} key={id}>
                    <div>
                      <ExpandedRoom room={room} />
                    </div>
                  </Collapse>
                </Card.Footer>
              </Card>
            );
          })}
        </section>
      ) : (
        <div className="empty">
          <h4>It seems as though your list is empty!</h4>
          <span>Try adding a room on the &#8220;Create a Room&#8221; page.</span>
        </div>
      )}
    </div>
  );
}

UserRooms.propTypes = {
  user: PropTypes.element.isRequired,
};
