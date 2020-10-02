import React from 'react';

import '../styles/infoBar.css';

function InfoBar({ room, name }) {
  const imageIcon = 'https://thumbs.gfycat.com/AmusingVeneratedAmurstarfish-small.gif';

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
    </div>
  );
}

export default InfoBar;
