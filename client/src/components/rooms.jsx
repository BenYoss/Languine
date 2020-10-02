import React, { useState, useEffect } from 'react';
import { getRooms, getUser } from '../helpers/helpers';
import '../styles/rooms.css';

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
        {rooms ? (
          rooms.map((room) => (
            <div className="room" key={room.Id}>
              <a className="roomTitleBtn" href={`/discussion?name=${user.id_google}&room=${room.name}&user=${user.username}`}>
                <h1 className="roomTitle">{room.name}</h1>
              </a>
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
