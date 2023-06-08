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

export const currSongContext = createContext({});
function App() {
  const [currSong, setCurrSong] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState([]);

  return (
    <div className="App">
      <currSongContext.Provider
        value={{ currSong, setCurrSong, currPlaylist, setCurrPlaylist }}
      >
        <Header />

        <TopHome />
        <Routes>
          <Route path="/" element={<Home currSong={currSong} />} exact />

          <Route
            exact
            path="/premium"
            element={<Premium currSong={currSong} />}
          />
          <Route
            exact
            path="/premium/detector"
            element={<Detector currSong={currSong} />}
          />
          <Route
            path="/playlist/:id"
            element={<PlaylistInterface currSong={currSong} />}
          />
        </Routes>
        {currSong !== null && <Player currSong={currSong} />}
      </currSongContext.Provider>
    </div>
  );
}

export default App;
