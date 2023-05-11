import React, { useState } from "react";
import "./style.css";
// import play1 from "../../svg/playlist/play1.jpeg";
import { playData } from "../../data/playData";
import { IoCloseOutline } from "react-icons/io5";
import { BsPlayFill } from "react-icons/bs";

export default function RightHome() {
  return (
    <div className="right_home">
      {/*<div className="right_home_close_button">
        <IoCloseOutline />
  </div>*/}
      <div className="heading">Next On Chillout Playlist</div>
      <div className="splitter1"></div>
      <div className="playlist_wrap">
        <div className="playlist_header">
          <div className="playlist_header_right">
            {playData.map((list, i) => (
              <div className="playlist" key={i}>
                <img src={list.image} alt="" className="playlist_img" />
                <BsPlayFill className="play_icon" />
                <div className="playlist_info">
                  <p>{list.songname}</p>
                  <p>{list.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
