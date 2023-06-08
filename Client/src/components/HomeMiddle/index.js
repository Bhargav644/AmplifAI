import React, { useState, useEffect } from "react";
import "./style.css";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import logo1 from "./play4.jpeg";
import UserMenu from "../userMenu";
import Search from "../../Search";

export default function TopHome() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // new state variable for modal

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/getAllSongs");
        setSongs(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    const filteredSongs = songs.filter((song) => {
      return (
        song.song_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (song.album_num &&
          song.album_num.toLowerCase().includes(searchTerm.toLowerCase()))
        // Add more search criteria here as needed
      );
    });

    setSearchResults(filteredSongs);
    setShowModal(
      filteredSongs.length > 0 && filteredSongs.length <= 1 && searchTerm !== ""
    );
  };

  return (
    <div className="top_middle">
      <div className="top_middle_input">
        <input
          type="text"
          className="middle_input"
          placeholder="Search for song, artist, lyrics..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <RiSearchLine className="middle_input_icon" />
      </div>
      <div className="middle_account_notify">
        <AiOutlineBell />
      </div>
      {/*<Link to="/profile" className="account">
        <img src={logo1} alt="" />
        <span>Chetan Sharma</span>
  </Link>*/}
      <div className={`circle_icon ${showUserMenu}`}>
        <div className="account">
          <span
            onClick={() => {
              setShowUserMenu((prev) => !prev);
            }}
          >
            SingUp
            {showUserMenu && <UserMenu />}
          </span>
        </div>
      </div>

      {/*<div className={`circle_icon ${showUserMenu}`}>
        <div>
          <div className="circle_icon">
            <BiDownArrow />
          </div>
        </div>
        </div>*/}
      {showModal && (
        <div
          // style={{
          //   display: "flex",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   border: "1px solid white",
          // }}
          className="search-modal"
        >
          <Search searchResults={searchResults} />
        </div>
      )}
    </div>
  );
}
