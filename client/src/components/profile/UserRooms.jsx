import React, { useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getRooms } from '../../helpers/helpers';
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
              <Card.Header>
                <h4>{room.name}</h4>
              </Card.Header>
              <Card.Body>
                <p>{room.description}</p>
              </Card.Body>
              <div className="room-btn-list">
                <Button className="btn-dark">Delete Room</Button>
                <Button className="btn-dark">Edit Room</Button>
                <Button className="btn-dark">Join Room</Button>
              </div>
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
