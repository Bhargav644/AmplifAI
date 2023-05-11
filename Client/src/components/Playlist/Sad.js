import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../header";
import TopHome from "../HomeMiddle";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { BsPlayFill } from "react-icons/bs";
import { sadSong } from "../../data/playData";
import { BiTime } from "react-icons/bi";
import TestPlayer from "../../TestPlayer";
import axios from "axios";
import RightHome from "../rightHome";

function Sad() {
  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRightHome, setShowRightHome] = useState(false);

  const handleRightHomeToggle = () => {
    setShowRightHome(!showRightHome);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/songs/sad");
        setSongs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // console.log(setSongs);

  return (
    <div className="mood_wrap">
      <div className="home_middle">
        <div className="mood_inner">
          <div className="mood_inner1">
            <img src="../../playlist/play4.jpeg" alt="logo" />
          </div>
          <div className="mood_inner_info">
            <div className="mood_header">Playlist</div>
            <div className="mood_header">Sad Songs</div>
            <div>Song for broken Hearts</div>
          </div>
        </div>
        <div className="mood_playlist_wrap">
          <div className="mood_playlist">
            <div className="mood_playlist_button">
              <button onClick={() => setIsPlaying(true)}>
                <BsPlayFill style={{ transform: "translateX(1.5px)" }} />
              </button>
              <button>
                <BsHeart style={{ transform: "translate(0.9px,2px)" }} />
              </button>
            </div>
          </div>
          <div className="mood_list">
            <table>
              <thead>
                <tr style={{ textAlign: "left" }}>
                  <th>#</th>
                  <th>Title</th>
                  <th>Album</th>
                  <th>
                    <BiTime />
                  </th>
                </tr>
              </thead>
              <tbody>
                {songs.slice(0, 50).map((song, i) => {
                  let id = i + 1;
                  return (
                    <tr className="tr1" key={song.id}>
                      <td>{id}</td>
                      <td
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                        }}
                      >
                        <img
                          src={song.image_link}
                          alt=""
                          style={{ height: "50px", borderRadius: "10px" }}
                        />
                        <div
                          className="song_title"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: "5px",
                          }}
                        >
                          <p>{song.song_name}</p>
                          <p>{song.artist_name}</p>
                        </div>
                      </td>
                      <td className="song_album">{song.album_name}</td>

                      <td>{song.duration_m}</td>
                      <audio src={song.song_url} controls></audio>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showRightHome && <RightHome />}
    </div>
  );
}
export default Sad;