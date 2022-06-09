import { useEffect, useRef, useState } from "react";
import "./dialogBubble.css";

const DialogBubble = ({ description }) => {
  return (
    /* key used to cause re-render on prop change */
    <div key={description} className="dialog">
      <div className="bubble-three">
        <p className="dialog__text">{description}</p>
      </div>
      <div className="bubble-two"></div>
      <div className="bubble-one"></div>
    </div>
  );
};

export default DialogBubble;
