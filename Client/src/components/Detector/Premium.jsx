import React from "react";
import { useNavigate } from "react-router-dom";
import "./Detector.css";

function Premium() {
  const navigate = useNavigate();
  function navigateToDetector() {
    navigate("/premium/detector");
  }
  return (
    <div className="premium">
      <div className="premium-mid">
        <h3 className="premium-heading">
          Get the{" "}
          <span style={{ color: "green" }} className="animate-charcter">
            AmplifAI
          </span>{" "}
          Premium !
        </h3>

        <p className="premium-text">
          Just ₹119/month after. Debit and credit cards accepted. Cancel
          anytime.
        </p>

        <div className="premium-button">
          <button className="button " onClick={navigateToDetector}>
            Get Started
          </button>
          <button
            className="button"
            style={{ backgroundColor: "green", border: "1px solid green" }}
          >
            See other Plans
          </button>
        </div>
      </div>
      <div className="premium_mid1">
        <h1 className="premium-heading1">
          The power of <span style={{ color: "green" }}>Premium</span>
        </h1>
        <div className="premium_banner">
          <div className="premium_banner_so premium_banner_so1">
            <img
              width={"142px"}
              height={"142px"}
              src="https://i.scdn.co/image/ab671c3d0000f4300e79e20edd40577fabe5e126"
              alt=""
            />
            <div className="premium_subheading">
              <p>Ad-free music listening</p>
              <p>Enjoy uninterrupted music.</p>
            </div>
          </div>
          <div className="premium_banner_so premium_banner_so2">
            <img
              width={"142px"}
              height={"142px"}
              src="https://i.scdn.co/image/ab671c3d0000f430dc1baa0957b0520c556c86b7"
              alt=""
            />
            <div className="premium_subheading ">
              <p>Offline playback</p>
              <p>Save your data by listening offline.</p>
            </div>
          </div>
          <div className="premium_banner_so premium_banner_so3">
            <img
              width={"142px"}
              height={"142px"}
              src="https://i.scdn.co/image/ab671c3d0000f430d6fee826d3ece1216e4f5772"
              alt=""
            />
            <div className="premium_subheading">
              <p>AdPlay everywhere</p>
              <p>Listen on your speakers, TV, and other favourite devices.</p>
            </div>
          </div>
          <div className="premium_banner_so">
            <img
              width={"142px"}
              height={"142px"}
              src="https://i.scdn.co/image/ab671c3d0000f4309977c2dc20e8cd1aaf755ba2"
              alt=""
            />
            <div className="premium_subheading">
              <p>Pay your way</p>
              <p>Prepay with Paytm, UPI, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Premium;
