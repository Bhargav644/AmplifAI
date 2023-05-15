import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
// import { BiMicrophone, BiLogOut } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  // AiOutlineDownload,
  AiOutlinePlus,
} from "react-icons/ai";
// import { HiArrowTrendingUp } from "react-icons/hi2";
import { RiPlayListFill } from "react-icons/ri";
import { MdWorkspacePremium } from "react-icons/md";
import logo from "../../svg/musiclogo.png";
import RightHome from "../rightHome";
import { TfiHandPointLeft } from "react-icons/tfi";

export default function Header(props) {
  const [showRightHome, setShowRightHome] = useState(false);

  const handleRightHomeToggle = () => {
    setShowRightHome(!showRightHome);
  };
  return (
    <header>
      <div className="header_top">
        <Link className="">
          <div className="logo_top">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
        </Link>
      </div>
      <div className="header_middle">
        <Link to="/" className="middle_icon active">
          <AiOutlineHome style={{ fontSize: "25px" }} />
        </Link>
        <Link to="/" className="middle_icon">
          <AiOutlineSearch style={{ fontSize: "25px" }} />
        </Link>
        <Link to="/" className="middle_icon">
          <AiOutlineHeart style={{ fontSize: "25px" }} />
        </Link>
        <Link className="middle_icon">
          <RiPlayListFill
            style={{ fontSize: "25px" }}
            onClick={handleRightHomeToggle}
          />
        </Link>
        <Link to="/" className="middle_icon">
          <AiOutlinePlus style={{ fontSize: "25px" }} />
        </Link>
        <Link to="/premium" className="middle_icon" style={{}}>
          <MdWorkspacePremium
            className="middle_icon_animation"
            style={{ fontSize: "35px" }}
          />
        </Link>
      </div>
      {showRightHome && <RightHome />}
    </header>
  );
}
