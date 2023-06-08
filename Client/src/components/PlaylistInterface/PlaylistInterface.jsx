import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PlaylistInterface.css";
import axios from "axios";
import { encryptData, decryptData } from "../../helper/helper";
import Loader from "../Loader/loader";
import Player from "../Player/Player";
import Songs from "./Songs";
import { currSongContext } from "../../App";
import { BiTime } from "react-icons/bi";
import  secureLocalStorage  from  "react-secure-storage";
import { BsHeart, BsPlayFill } from "react-icons/bs";
import { UserContext } from '../../App';

function PlaylistInterface() {
  const { id } = useParams();
  const [songs, setSongs] = useState({});
  const {user,setUser}=useContext(UserContext);

  const { currSong, setCurrSong, currPlaylist, setCurrPlaylist } =
    useContext(currSongContext);

  useEffect(() => {

    const playlist=JSON.parse(secureLocalStorage.getItem("playlists"));
    Object.keys(playlist).forEach((key)=>{
      if(playlist[key]._id===id){
        setSongs(playlist[key]);
        return;
      }
    });
  }, []);

  const runTheSong = (data) => {
    setCurrSong(data);
  };

  const runThePlaylist = (data) => {
    // console.log(songs)
    setCurrPlaylist(data);

    setCurrSong(data[0]);
  };

  return (
    <>
      <div className="playlist-interface">

        {Object.keys(songs).length > 0 ? (
          <div className="playlist-main">
            <div className="playlist-header">
              <div className="playlist-image">
                <img
                  className="playlist-img"
                  src={songs.playlist_songs[0].image_link}
                />
              </div>
              <div className="playlist_header_inner">
                <p className="playlist-tag">Public Playlist</p>
                <br />
                <p className="playlist-name">{songs.playlist_name}</p>
                <br />
                <div className="mood_playlist">
                  <div className="mood_playlist_button">
                    <button
                      onClick={() => runThePlaylist(songs.playlist_songs)}
                    >
                      <BsPlayFill style={{ transform: "translateX(1.5px)" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="playlist-songs">
              <table>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>#</th>
                    <th>Song Name</th>
                    <th>Album Name</th>
                    <th>Release Date</th>
                    <th>
                      <BiTime />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {songs.playlist_songs.map((val, index) => (
                    <Songs
                      user={user}
                      runTheSong={runTheSong}
                      song={val}
                      id={index + 1}
                      key={index}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="loader_div">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
}

export default PlaylistInterface;
