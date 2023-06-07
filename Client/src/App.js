import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Player from "./components/Player/Player";
import PlayerMain from "./components/Player/PlayerMain";
import Header from "./components/header";

import PlaylistInterface from "./components/PlaylistInterface/PlaylistInterface";
import { useEffect, useState } from "react";
import TopHome from "./components/HomeMiddle";
import Search from "./Search";
import Detector from "./components/Detector/Detector";
import Login from "./components/Login/RegisterForm";

function App() {
  const [showRightHome, setShowRightHome] = useState(true);

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
      <Header />

      <TopHome />
      <Routes>
        <Route path="/" element={<Home />} exact />
        {/*<Route path="/player" element={<Player />} />*/}

        <Route path="/premium" element={<Detector />} />
        <Route path="/playlist/Lid" element={<PlaylistInterface/>} />

        <Route element={<Search />} />
        {/*<Route path="/credential" element={<Login />} />*/}
      </Routes>
      {/* {showRightHome && <RightHome />} */}
    </div>
  );
}

export default App;
