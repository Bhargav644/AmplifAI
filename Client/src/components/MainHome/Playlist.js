import React from "react";
import { BsPlayFill } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function Playlist(props) {
  return (
    <div className="play">
      <Link style={{ background: "transparent", border: "none" }}>
        <BsPlayFill className="play_icon" />
      </Link>
      <img src={props.image} alt="" />
      <div className="play_name">
        <p>{props.tag}</p>
        <p>{props.title}</p>
      </div>
    </div>
  );
}
