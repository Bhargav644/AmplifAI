import React, { useState, useEffect } from "react";
import Header from "../header";
import RightHome from "../rightHome/index";
import TopHome from "../HomeMiddle";
import "./style.css";
import MainHome from "../MainHome";
import Player from "../Player/Player";
import { AiOutlineMenu } from "react-icons/ai";

export default function Home() {
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
    <div className="home">
      <div className="home_middle">
        <MainHome />
      </div>
      {/*{showRightHome && <RightHome /> /*Bottom Player*/}
      {/* <Player /> */}
    </div>
  );
}
