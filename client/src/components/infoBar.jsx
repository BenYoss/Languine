import React from 'react';

function InfoBar({ room }) {
  const imageIcon = "https://www.specialmetals.com/assets/images/slide-pics/blue-box4.png";
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={imageIcon} alt="" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <img className="onlineIcon" src={imageIcon} alt="" />
      </div>
    </div>
  );
}

export default InfoBar;
