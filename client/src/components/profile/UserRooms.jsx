import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getRooms } from '../../helpers/helpers';
import deleteIcon from '../../img/delete-icon.png';
import editIcon from '../../img/edit-icon.png';
import joinIcon from '../../img/join-room-icon.png';
import '../../styles/profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserRooms({ user }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRooms().then((roomList) => setRooms(roomList.filter((room) => {
      console.log(user);
      if (room.id_host === user.id_google) {
        return room;
      }
      return null;
    }))).catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <section className="room-header">
        <h4>My Room&apos;s</h4>
      </section>
      {rooms.length > 0 ? (
        <section className="room-list">
          {rooms.map((room) => (
            <Card>
              <Card.Header className="room-list-header">
                <div className="room-btn-list">
                  <Button className="btn-dark">
                    <img src={deleteIcon} alt="delete a room trashcan" className="room-icon" width="20px" height="20px" />
                  </Button>
                  <Button className="btn-dark">
                    <img src={editIcon} alt="edit a room notepad" className="room-icon" width="20px" height="20px" />
                  </Button>
                  <Button className="btn-dark">
                    <img src={joinIcon} alt="join a room door" className="room-icon" width="20px" height="20px" />
                  </Button>
                  <div className="room-title">
                    <h4>{room.name}</h4>
                  </div>
                </div>
              </Card.Header>
              <Card.Body>
                <p>{room.description}</p>
              </Card.Body>
            </Card>
          ))}
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
