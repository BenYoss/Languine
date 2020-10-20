import React from 'react';
import { Button } from 'react-bootstrap';
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
        <h3>
          {room}
          :
          {name}
        </h3>
      </div>
      <div>
        {host === account ? (
          <Button
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
            width="30"
          >
            Delete Room
          </Button>
        ) : ''}
      </div>
      <div className="rightInnerContainer">
        <img className="onlineIcon" src={imageIcon} alt="" />
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
