import React, { useState, useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { getRooms, getUser } from '../helpers/helpers';
import '../styles/rooms.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function RoomList() {
  const [rooms, setRooms] = useState([]);
  const [user, setUser] = useState('');

  useEffect(() => {
    getRooms()
      .then((roomData) => {
        setRooms(roomData);
        getUser()
          .then((userInfo) => {
            setUser(userInfo);
          });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="roomListContainer">
      <div className="roomListHeader">
        <h2>Room List</h2>
      </div>
      <div className="roomListInnerContainer">
        {rooms.length ? (
          rooms.map((room) => (
            <div className="room" key={room.Id}>
              <Nav.Link style={{ color: 'white' }} href={`/discussion?name=${user.id_google}&room=${room.name}&user=${user.username}`}>
                <h2 className="roomDesc">{room.name}</h2>
              </Nav.Link>
              <div>
                {!room.is_public ? (
                  <img className="roomDesc" src="https://www.pointcare.com/wp-content/uploads/2018/12/lock-icon.png" alt="" width="40" height="40" />
                ) : ''}
              </div>
              <h2 className="roomDesc">{room.description}</h2>
            </div>
          ))
        ) : (
          <div>
            <h1>Sorry, but there are no rooms as of yet...</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default RoomList;
