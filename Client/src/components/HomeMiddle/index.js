import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import axios from "axios";
import { UserContext } from "../../App";
import UserMenu from "../userMenu";
import Search from "../../Search";
import { currSongContext } from "../../App";

import { auth, provider } from "../../config";
import { signInWithPopup } from "firebase/auth";
import googleOneTap from "google-one-tap";

const options = {
  client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  auto_select: false,
  cancel_on_tap_outside: false,
  context: "signin",
};

export default function TopHome() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // new state variable for modal

  const { user, setUser } = useContext(UserContext);
  const { currSong, setCurrSong, currPlaylist, setCurrPlaylist } =
    useContext(currSongContext);

  function handleGoogleSignIn() {
    signInWithPopup(auth, provider)
      .then((data) => {
        setUser({
          name: data.user.displayName,
          email: data.user.email,
          photoURL: data.user.photoURL,
        });

        fetch("/api/google-popup-login", {
          method: "POST",
          body: JSON.stringify({
            name: data.user.displayName,
            email: data.user.email,
            photoURL: data.user.photoURL,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => {
          const data = response.json();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // if(searchTerm!==""){

  /** Applying Debouncing here */
  const [debouncedValue, setDebouncedValue] = useState(searchTerm);
  const [token, setToken] = useState("");

  const search = async (searchTerm) => {
    let cancelTokenSource = axios.CancelToken.source();
    setToken(cancelTokenSource);

    axios
      .post(
        "/findSongs",
        { keyword: searchTerm },
        { cancelToken: cancelTokenSource.token }
      )
      .then((res) => {
        const filteredSongs = res.data.result;
        console.log(filteredSongs);
        setSearchResults(filteredSongs);
        setShowModal(
          filteredSongs.length > 0 &&
            filteredSongs.length <= 1 &&
            searchTerm !== ""
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(searchTerm), 500);

    return () => clearTimeout(timer);
  }, [searchTerm, 500]);

  useEffect(() => {
    if (debouncedValue) {
      search(searchTerm);
    }

    return () => {
      if (token) {
        token.cancel("Request canceled");
      }
    };
  }, [debouncedValue]);

  useEffect(() => {
    auth.onAuthStateChanged((currUser) => {
      if (currUser !== null) {
        setUser({
          name: currUser.displayName ? currUser.displayName : "",
          email: currUser.email ? currUser.email : "",
          photoURL: currUser.photoURL ? currUser.photoURL : "",
        });
      } else {
        googleOneTap(options, async (res) => {
          const response = await fetch("/api/google-onetap-login", {
            method: "POST",
            body: JSON.stringify({
              token: res.credential,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          setUser({
            name: data.name,
            email: data.email,
            photoURL: data.picture,
          });
        });
      }
    });
  }, []);

  const handleSearch = async (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
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

      <div>
        <div className="account">
          {user.name === "" ? (
            <span onClick={handleGoogleSignIn}>Sign Up</span>
          ) : (
            <a
              onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}
            >
              <img className="profile-image" src={user["photoURL"]} />
              {showUserMenu && (
                <UserMenu
                  name={user.name}
                  email={user.email}
                  photoURL={user["photoURL"]}
                />
              )}
            </a>
          )}
        </div>
      </div>

      <br />
      {searchResults.length != 0 && (
        <div className="search-modal">
          <Search
            user={user}
            currSong={currSong}
            setCurrSong={setCurrSong}
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </div>
      )}
    </div>
  );
}
