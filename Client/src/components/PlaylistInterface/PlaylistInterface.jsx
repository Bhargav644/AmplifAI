import React,{useEffect,useState,useContext} from 'react'
import { useParams } from 'react-router-dom'
import "./PlaylistInterface.css"
import axios from 'axios';
import { encryptData,decryptData } from '../../helper/helper';
import Loader from '../Loader/loader';
import Player from '../Player/Player';
import Songs from './Songs';
import { currSongContext } from '../../App';


function PlaylistInterface() {

  const {currSong,setCurrSong,currPlaylist,setCurrPlaylist}=useContext(currSongContext);
  const {id}=useParams();
  const [songs,setSongs]=useState({});
  
  useEffect(() => {
      axios.get(`/getPlaylist/${id}`).then((res)=>{
          setSongs(res.data[0]);
          console.log(res.data[0]);
      }).catch((err)=>{
    })
  }, [])
  

  const runTheSong=(data)=>{
    setCurrSong(data);
  }

  const runThePlaylist=(data)=>{
    setCurrPlaylist(data);
  }


  return (
    <>
      <div className='playlist-interface'>

         {Object.keys(songs).length>0 ? (
          <div className='playlist-main'>
            <div className="playlist-header">
                <div className="playlist-image">
                  <img className='playlist-img' src={songs.playlist_songs[0].image_link}/>
                </div>
                <div>
                  <p className='playlist-tag'>Public Playlist</p>
                  <br/>
                  <p className='playlist-name'>
                    {songs.playlist_name}
                  </p>
                </div>
            </div>
            <div className="playlist-songs">
                  {
                     songs.playlist_songs.map((val,index)=>{
                       return <Songs song={val} id={index+1}/>
                     })
                  }
            </div>
          </div>
        ): 
        <div className='loader_div'>
          <Loader/>
        </div>
        } 
      </div>

    </>
  )
}

export default PlaylistInterface;
