import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import "./PlaylistInterface.css"
import axios from 'axios';
import { encryptData,decryptData } from '../../helper/helper';
import Loader from '../Loader/loader';
import Player from '../Player/Player';

function PlaylistInterface() {

  const {id}=useParams();
  const [songs,setSongs]=useState({});
  
  useEffect(() => {
      axios.get(`/getPlaylist/${id}`).then((res)=>{
          setSongs(res.data);
          console.log(res.data[0]);
      }).catch((err)=>{
    })
  }, [])
  

  return (
    <>
      <div className='playlist-interface'>

        {/* {Object.keys(songs).length>0 ? (
          <>
            <div className="playlist-header">
                <div className="playlist-image">
                  <img src={songs[0].playlist_songs[0].image_link}/>
                </div>
            </div>
            <div className="playlist-songs">

            </div>
          </>
        ): */}
        <div className='loader_div'>
          <Loader/>
        </div>
        {/* } */}
      </div>

      <Player/>
    </>
  )
}

export default PlaylistInterface