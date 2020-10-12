import React from 'react';
import PropTypes from 'prop-types';
import { getRoom, deleteRoom, deleteMessages } from '../../helpers/helpers';

import '../../styles/infoBar.css';

function InfoBar({
  room, name, host, account,
}) {
  const imageIcon = 'https://thumbs.gfycat.com/AmusingVeneratedAmurstarfish-small.gif';

  const roomDeletion = (roomId) => deleteRoom(roomId)
    .then(() => deleteMessages(roomId)
      .then(() => { window.location.href = '/roomlist'; }))
    .catch((err) => console.error(err));

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={imageIcon} alt="" />
        <h2>
          {room}
          :
          {name}
        </h2>
      </div>
      <div className="rightInnerContainer">
        <img className="onlineIcon" src={imageIcon} alt="" />
      </div>
      <div>
        {host === account ? (
          <button
            className="messageText colorWhite"
            type="submit"
            onClick={
            () => {
              getRoom(room)
                .then((roomData) => {
                  const { _id } = roomData[0];
                  roomDeletion(_id);
                })
                .catch((err) => console.error(err));
            }
          }
          >
            Delete Room
          </button>
        ) : ''}
      </div>
    </div>
  );
}

InfoBar.propTypes = {
  room: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  account: PropTypes.string.isRequired,
};

export default InfoBar;
