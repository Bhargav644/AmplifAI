import React from "react";
import { BsPlayFill } from "react-icons/bs";

export default function Playlist(props) {
  return (
    <div className="play">
      <BsPlayFill className="play_icon" />
      <img src={props.image} alt="" />
      <div className="play_name">
        <p>{props.tag}</p>
        <p>{props.title}</p>
      </div>
    </div>
  );
}
