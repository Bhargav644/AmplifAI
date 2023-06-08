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
import { BsHeart, BsPlayFill } from "react-icons/bs";

function PlaylistInterface() {
  const { id } = useParams();
  const [songs, setSongs] = useState({});

  const { currSong, setCurrSong, currPlaylist, setCurrPlaylist } =
    useContext(currSongContext);

  useEffect(() => {
    axios
      .get(`/getPlaylist/${id}`)
      .then((res) => {
        setSongs(res.data[0]);
        console.log(res.data[0]);
      })
      .catch((err) => {});
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
                    {/*<th>Artist Name</th>*/}
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
