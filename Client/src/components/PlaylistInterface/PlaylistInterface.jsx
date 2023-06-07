import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import "./PlaylistInterface.css"
import axios from 'axios';
import { encryptData,decryptData } from '../../helper/helper';
import Loader from '../Loader/loader';
import Player from '../Player/Player';
import Songs from './Songs';

function PlaylistInterface() {

  const {id}=useParams();
  const [songs,setSongs]=useState({});
  
  useEffect(() => {
      axios.get(`/getPlaylist/${id}`).then((res)=>{
          setSongs(res.data[0]);
          console.log(res.data[0]);
      }).catch((err)=>{
    })
  }, [])
  

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
              <div>
                <p className="playlist-tag">Public Playlist</p>
                <br />
                <p className="playlist-name">{songs.playlist_name}</p>
              </div>
            </div>
            <div className="playlist-songs">
              <table>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>#</th>
                    <th>Song Name</th>
                    <th>Artist Name</th>
                    <th>Album Name</th>
                    <th>Release Date</th>
                    <th>
                      <BiTime />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {songs.playlist_songs.map((val, index) => (
                    <Songs song={val} id={index + 1} key={index} />
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

      <Player/>
    </>
  );
}

export default PlaylistInterface;
