import React from "react";

export default function SettingPrivacy({ setVisible }) {
  return (
    <div className="absolute_wrap">
      <div className="absolute_wrap_header">
        <div
          className="circle hover1"
          style={{ borderRadius: "50%" }}
          onClick={() => {
            setVisible(0);
          }}
        >
          <i className="arrow_back_icon"></i>
        </div>
        Settings & Privacy
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle "></div>
        <span>Settings</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle"></div>
        <span>Privacy Checkups</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle"></div>
        <span>Privacy Shortcuts</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle"></div>
        <span>Activity Log</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle"></div>
        <span>News Feed Prefrences</span>
      </div>
      <div className="mmenu_item hover3">
        <div className="small_circle"></div>
        <span>Language</span>
      </div>
    </div>
  );
}
