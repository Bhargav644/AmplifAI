import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Playlist from "../MainHome/Playlist";

import axios from "axios";
import "../MainHome/style.css"

export default function PlaylistSection({emotion,playlist}) {


  const emotion_type = emotion.emotion_type.charAt(0).toUpperCase() + emotion.emotion_type.substring(1);
  const emotion_dominance=(emotion.emotion_dominance*100).toFixed(2)
  return (
    <div className="mainhome_wrap">
      <div className="mainhome_heading">Recommended Playlists:</div>
      <p style={{color:"green"}}>{emotion_type} : {emotion_dominance} %</p>
      <br/>
      <div className="mainhome_out">
        {Object.keys(playlist).map((key, idx) => {
          const list = playlist[key];
          return (
            <Link to={`/playlist/${list._id}`}>
              <Playlist
                image={list.playlist_songs[Math.floor(Math.random() * list.playlist_songs.length)].image_link}
                tag={list.playlist_name}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
