import React, { useState, useEffect,useContext } from "react";
import "./style.css";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { BiDownArrow } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../../App';
import UserMenu from "../userMenu";
import Search from "../../Search";

import {auth,provider} from "../../config"
import {signInWithPopup} from "firebase/auth"
import googleOneTap from "google-one-tap";

const options={
  client_id:process.env.REACT_APP_GOOGLE_CLIENT_ID,
  auto_select:false,
  cancel_on_tap_outside:false,
  context:"signin"
}

export default function TopHome() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // new state variable for modal

  const {user,setUser}=useContext(UserContext);

  function handleGoogleSignIn(){
      signInWithPopup(auth,provider).then((data)=>{

          setUser({
              "name":data.user.displayName,
              "email":data.user.email,
              "photoURL":data.user.photoURL
          });

          fetch("/api/google-popup-login",{
              method:"POST",
              body:JSON.stringify({name:data.user.displayName,email:data.user.email,photoURL:data.user.photoURL}),
              headers:{
                  "Content-Type": "application/json",
              }
          }).then((response)=>{
              const data=response.json();
          })
      }).catch((err)=>{
          console.error(err);
      });
  }

  useEffect(() => {
    auth.onAuthStateChanged((currUser)=>{
        if(currUser!==null){
            setUser({
                'name':(currUser.displayName)?currUser.displayName:"",
                'email':(currUser.email)?currUser.email:"",
                "photoURL":(currUser.photoURL)?currUser.photoURL:"",
            })
        }
        else{
            googleOneTap(options, async (res) => {
                const response=await fetch("/api/google-onetap-login",{
                    method:"POST",
                    body:JSON.stringify({
                        token:res.credential,
                    }),
                    headers:{
                        "Content-Type": "application/json",
                    }
                });
                const data=await response.json();
                setUser({
                    'name':data.name,
                    'email':data.email,
                    "photoURL":data.picture,
                })
            });
        }
    })
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
          {(user.name==="")?
          (
            <span onClick={handleGoogleSignIn}>
              Sign Up
            </span>
          ):
          (
              <a onClick={() => {
                setShowUserMenu((prev) => !prev);
              }}>
                <img className="profile-image" src={user["photoURL"]}/>
              {showUserMenu && <UserMenu name={user.name} email={user.email} photoURL={user["photoURL"]} />}
              </a>
          )
          }
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
