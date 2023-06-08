import React,{useState,useEffect,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Songs from '../PlaylistInterface/Songs'
import { UserContext } from '../../App';
import axios from 'axios';
import { currSongContext } from "../../App";
import { BiTime } from "react-icons/bi";

function LikedSongs() {

  const navigate=useNavigate();
  
  const {user,setUser}=useContext(UserContext);

  const [likedSongs,setLikedSongs]=useState([]);
  
  const { currSong, setCurrSong, currPlaylist, setCurrPlaylist } =
  useContext(currSongContext);
  const runTheSong = (data) => {
    setCurrSong(data);
  };

  useEffect(() => {
    console.log("hello",user.email)
    if(user.email===""){
        navigate("/");
    }
    axios.post("/likedSongs",{email:user.email}).then((res)=>{
        setLikedSongs(res.data.data);
    }).catch((err) => {
        console.log(err);
    });
    
  }, [])
  
  return (
    <div className="playlist-songs" style={{width:"80vw",margin:"auto",transform:"translateX(50px)"}}>
        <h2>Liked Songs:</h2>
        <br></br>
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
            {Object.keys(likedSongs).map((val, index) => (
                <Songs
                    user={user}
                    runTheSong={runTheSong}
                    song={likedSongs[val]}
                    id={index + 1}
                    key={index}
                />
            ))}
        </tbody>
        </table>
    </div>
  )
}

export default LikedSongs