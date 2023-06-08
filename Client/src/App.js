import "./App.css";
import { useEffect, useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Player from "./components/Player/Player";
import Header from "./components/header";

import PlaylistInterface from "./components/PlaylistInterface/PlaylistInterface";
import TopHome from "./components/HomeMiddle";
import Search from "./Search";
import Detector from "./components/Detector/Detector";
import Login from "./components/Login/RegisterForm";
import Premium from "./components/Detector/Premium";

export const currSongContext = createContext({});
function App() {
  const [showRightHome, setShowRightHome] = useState(true);

  const [currSong, setCurrSong] = useState(null);
  const [currPlaylist, setCurrPlaylist] = useState([]);

  function toggleRightHome() {
    setShowRightHome(!showRightHome);
  }
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1015) {
        setShowRightHome(false);
      } else {
        setShowRightHome(true);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="App">
      <currSongContext.Provider
        value={{ currSong, setCurrSong, currPlaylist, setCurrPlaylist }}
      >
        <Header />

        <TopHome />
        <Routes>
          <Route path="/" element={<Home currSong={currSong} />} exact />
          {/*<Route path="/player" element={<Player />} />*/}

          <Route exact path="/premium" element={<Premium currSong={currSong} />} />
          <Route exact path="/premium/detector" element={<Detector currSong={currSong} />} />
          <Route
            path="/playlist/:id"
            element={<PlaylistInterface currSong={currSong} />}
          />

          {/*<Route path="/credential" element={<Login />} />*/}
        </Routes>
        {currSong !== null && <Player currSong={currSong} />}
      </currSongContext.Provider>
      {/* {showRightHome && <RightHome />} */}
    </div>
  );
}

export default App;
