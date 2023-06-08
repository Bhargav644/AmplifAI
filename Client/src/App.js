import "./App.css";
import { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Player from "./components/Player/Player";
import Header from "./components/header";
import PlaylistInterface from "./components/PlaylistInterface/PlaylistInterface";
import TopHome from "./components/HomeMiddle";
import Detector from "./components/Detector/Detector";

import Premium from "./components/Detector/Premium";
import LikedSongs from "./components/LikedSongs/LikedSongs";


export const currSongContext = createContext({});
export const UserContext = createContext({});
function App() {
  const [currSong, setCurrSong] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState([]);

  const [user,setUser]=useState({
      'name':"",
      'email':"",
      "photoURL":""
  });

  
  return (
    <div className="App">
      <UserContext.Provider value={{user,setUser}}>

        <currSongContext.Provider value={{ currSong, setCurrSong, currPlaylist, setCurrPlaylist }}>
          <Header /> 

          <TopHome user={user}/>
          <Routes>
            <Route path="/" element={<Home user={user} currSong={currSong} />} exact />

            <Route exact path="/premium" element={<Premium user={user} currSong={currSong} />} />
            
            <Route exact path="/premium/detector" element={<Detector user={user} currSong={currSong} />} />
            
            <Route
              path="/playlist/:id"
              element={<PlaylistInterface user={user} currSong={currSong} />}
            />

            <Route path="/likedSongs" element={<LikedSongs user={user} currSong={currSong}/>}/>

            {/*<Route path="/credential" element={<Login />} />*/}
          </Routes>
          {currSong !== null && <Player currSong={currSong} />}
        </currSongContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
