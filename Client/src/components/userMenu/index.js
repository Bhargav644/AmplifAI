import { useState } from "react";
import { Link } from "react-router-dom";
import SettingPrivacy from "./SettingPrivacy";
import HelpSupport from "./HelpSupport";
import DisplayAccessibility from "./DisplayAccessibility";
import logo1 from "../HomeMiddle/play4.jpeg";

export default function UserMenu() {
  const [visible, setVisible] = useState(0);
  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <Link to="/profile" className="mmenu_header hover3">
            <img src={logo1} alt="" />
            <div className="mmenu_col">
              <span>Chetan Sharma</span>
              <span>See your profile</span>
            </div>
          </Link>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_item hover3">
            <div className="small_circle"></div>
            <span>Account</span>
            <div className="rArrow"></div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle"></div>
            <span>Premium Feature </span>
            <div className="rArrow"></div>
          </div>
          <div className="mmenu_item hover3">
            <div className="small_circle"></div>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
