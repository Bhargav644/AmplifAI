import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Playlist from "../MainHome/Playlist";
import axios from "axios";
import "../MainHome/style.css"

export default function PlaylistSection({playlist}) {

  return (
    <div className="mainhome_wrap">
      <div className="mainhome_heading">Recommended Playlists:</div>
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
