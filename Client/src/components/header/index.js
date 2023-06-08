import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import {
  AiOutlineHeart,
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlinePlus,
} from "react-icons/ai";
import { RiPlayListFill } from "react-icons/ri";
import { MdWorkspacePremium } from "react-icons/md";
import logo from "../../svg/musiclogo.png";

export default function Header(props) {
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
          <RiPlayListFill style={{ fontSize: "25px" }} />
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
    </header>
  );
}
