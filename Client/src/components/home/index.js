import React, { useState, useEffect } from "react";
import Header from "../header";
import RightHome from "../rightHome/index";
import TopHome from "../HomeMiddle";
import "./style.css";
import MainHome from "../MainHome";
import Player from "../Player/Player";
import { AiOutlineMenu } from "react-icons/ai";
import PlaylistInterface from "../PlaylistInterface/PlaylistInterface";

export default function Home() {
  return (
    <div className="home">
      <div className="home_middle">
        <MainHome />
      </div>
      {/*{showRightHome && <RightHome /> /*Bottom Player*/}
    </div>
  );
}
