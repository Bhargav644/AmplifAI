import { useState } from "react";
import { Link } from "react-router-dom";
import logo1 from "../HomeMiddle/play4.jpeg";
import { auth, provider } from "../../config";

export default function UserMenu({ name, email, photoURL }) {
  const [visible, setVisible] = useState(0);
  function signOut() {
    auth.signOut();
    window.location.reload();
  }

  return (
    <div className="mmenu">
      {visible === 0 && (
        <div>
          <div className="mmenu_header hover3">
            <img src={photoURL} />
            <div className="mmenu_col">
              <span>{name}</span>
              <span
                style={{
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  display: "bloack",
                  width: "150px",
                }}
              >
                {email}
              </span>
            </div>
          </div>
          <div className="mmenu_splitter"></div>
          <div className="mmenu_splitter"></div>
          <Link to="/premium">
            <div className="mmenu_item hover3">
              <div className="small_circle"></div>
              <span>Premium Feature </span>
              <div className="rArrow"></div>
            </div>
          </Link>
          <div onClick={signOut} className="mmenu_item hover3">
            <div className="small_circle"></div>
            <span>Logout</span>
          </div>
        </div>
      )}
    </div>
  );
}
