import React, { useRef, useEffect, useState } from "react";
import "./style.css";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsSkipEndCircleFill,
  BsFillSkipEndCircleFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";
import { BiRepeat } from "react-icons/bi";
import { RiPlayListLine } from "react-icons/ri";

const PlayerMain = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
}) => {
  const [shuffleActive, setShuffleActive] = useState(true);
  const [repeat, setRepeat] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const clickRef = useRef();

  useEffect(() => {
    setCurrentSongIndex(songs.findIndex((x) => x.title === currentSong.title));
  }, [currentSong, songs]);

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
  }, [currentSongIndex]);

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (time) => {
    if (isNaN(time) || !isFinite(time)) {
      console.error(`Invalid time: ${time}`);
      return;
    }
    audioElem.current.currentTime = time;
  };

  const skipBack = () => {
    const currentIndex = currentSongIndex;
    let newIndex = currentIndex - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    setCurrentSong(songs[newIndex]);
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    let newIndex;
    if (shuffleActive) {
      newIndex = Math.floor(Math.random() * songs.length);
    } else {
      const currentIndex = currentSongIndex;
      newIndex = currentIndex + 1;
      if (newIndex >= songs.length) {
        if (repeat) {
          newIndex = 0;
        } else {
          newIndex = songs.length - 1;
          setisplaying(false);
          return;
        }
      }
    }
    // Check if audio element is ready to play next song
    if (audioElem.current.readyState >= 2) {
      setCurrentSong(songs[newIndex]);
      setCurrentSongIndex(newIndex); // Add this line
      audioElem.current.currentTime = 0;
      setisplaying(true);
    } else {
      // If not ready, wait for canplay event before updating state and playing next song
      audioElem.current.addEventListener("canplay", () => {
        setCurrentSong(songs[newIndex]);
        setCurrentSongIndex(newIndex); // Add this line
        audioElem.current.currentTime = 0;
        setisplaying(true);
        audioElem.current.removeEventListener("canplay", () => {});
      });
    }
  };

  const toggleShuffle = () => {
    setShuffleActive(!shuffleActive);
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  return (
    <div className="player_wrap">
      {currentSong && (
        <div className="player_wrap_image" style={{ color: "white" }}>
          <img src={currentSong.image_link} alt="" />
          <div className="title">
            <p>{currentSong.song_name}</p>
            <p>{currentSong.artist_name}</p>
          </div>
        </div>
      )}
      <div className="player_container">
        <div className="navigation">
          <div
            className="navigation_wrapper"
            onClick={checkWidth}
            ref={clickRef}
          >
            {currentSong && (
              <div
                className="seek_bar"
                style={{ width: `${currentSong.progress + "%"}` }}
              ></div>
            )}
          </div>
        </div>
        <div className="controls">
          <BsRepeat
            className={repeat ? "shuffle-active" : ""}
            onClick={toggleRepeat}
          />
          <BsFillSkipStartCircleFill
            className="btn_action"
            onClick={skipBack}
          />
          {isplaying ? (
            <BsFillPauseCircleFill
              className="btn_action pp"
              onClick={PlayPause}
            />
          ) : (
            <BsFillPlayCircleFill
              className="btn_action pp"
              onClick={PlayPause}
            />
          )}
          <BsFillSkipEndCircleFill
            className="btn_action"
            onClick={skiptoNext}
          />
          <BsShuffle
            className={shuffleActive ? "shuffle-active" : ""}
            onClick={toggleShuffle}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerMain;
