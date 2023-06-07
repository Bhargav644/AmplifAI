import React,{useEffect,useState} from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Playlist from "./Playlist";
import axios from "axios";


export default function MainHome() {

  const [playlist,setPlaylist]=useState([]);

  useEffect(()=>{
    axios.get("/getPlaylist").then((res)=>{
      console.log(res.data);
    }).catch((err)=>{
      console.log(err.message);
    })
  },[]);


  return (
    <div className="mainhome_wrap">
      <div className="mainhome_heading">
        <Link to="/moodPlayList">Playlist</Link>
      </div>
      <div className="mainhome_out">
        <Link to="/sad">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b273da50894e074ecd5ce61de0a1"
            tag="Sad Songs"
            title="2023,Sad Music Zone"
          />
        </Link>
        <Link to="/arijit">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b27374d7f07e7a316eca66852d46"
            tag="Arijit Singh Songs"
            title="2023, Arijit Plays"
          />
        </Link>
        <Link to="/shreya">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b2734c30b2c8eaa6ed1b01c518a6"
            tag="Shreya Ghoshal Songs"
            title="2023 Shreya Ghoshal"
          />
        </Link>
        <Link to="/bhajan">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b2734233c0ae8584d0fcf7d4b570"
            tag="Fear Songs"
            title="2023 Bhajan Songs"
          />
        </Link>
        <Link to="/dailyMix1">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b2736d3eb740a87b5c21d2ac345f"
            tag="Daily Mix 1"
            title="Ap Dilllon, Shreya and more..."
          />
        </Link>
        <Link to="/pritam">
          <Playlist
            image="https://i.scdn.co/image/ab67616d0000b273daa89593cc2cde9651665d03"
            tag="Pritam Album Songs"
            title="Top Pritam Songs Ever"
          />
        </Link>
      </div>
    </div>
  );
}
