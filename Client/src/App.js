import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Player from "./components/Player/Player";
import Sad from "./components/Playlist/Sad";
import PlayerMain from "./components/Player/PlayerMain";
import Header from "./components/header";
import TestPlayer from "./TestPlayer";
import ArijitPlay from "./components/Playlist/ArijitPlay";
import Shreya from "./components/Playlist/Shreya";
import Bhajan from "./components/Playlist/Bhajan";
import DailyMix from "./components/Playlist/DailyMix";
import Pritam from "./components/Playlist/Pritam";

import RightHome from "./components/rightHome";

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
        <Route path="/sad" element={<Sad />} />
        <Route path="/arijit" element={<ArijitPlay />} />
        <Route path="/shreya" element={<Shreya />} />
        <Route path="/bhajan" element={<Bhajan />} />
        <Route path="/dailyMix1" element={<DailyMix />} />
        <Route path="/pritam" element={<Pritam />} />
        <Route path="/premium" element={<Detector />} />

        <Route element={<Search />} />
        {/*<Route path="/credential" element={<Login />} />*/}
      </Routes>
      {/* {showRightHome && <RightHome />} */}
    </div>
  );
}

export default App;
