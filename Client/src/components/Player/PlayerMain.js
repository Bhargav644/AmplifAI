import React, { useRef, useEffect, useState, useCallback } from "react";
import "./style.css";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsFillSkipStartCircleFill,
  BsFillSkipEndCircleFill,
  BsShuffle,
  BsRepeat,
} from "react-icons/bs";

const PlayerMain = ({
  audioElem,
  isplaying,
  setisplaying,
  currentSong,
  setCurrentSong,
  songs,
  playing,
  changePlaying,
}) => {
  const [shuffleActive, setShuffleActive] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const clickRef = useRef();

  const nextSong = useCallback(() => {
    audioElem.current.currentTime = 0;
  }, []);

  useEffect(() => {
    setCurrentSongIndex(songs.findIndex((x) => x.title === currentSong.title));
  }, [currentSong]);

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play();
    }
  }, [currentSongIndex]);

  const PlayPause = () => {
    setisplaying(!isplaying);
  };

  const checkWidth = (time) => {
    const bar = clickRef.current;
    const clickPosition = time.clientX - bar.getBoundingClientRect().left;
    const barWidth = bar.offsetWidth;
    const clickPercentage = (clickPosition / barWidth) * 100;
    const newTime = (clickPercentage / 100) * audioElem.current.duration;
    audioElem.current.currentTime = newTime;
  };

  const skipBack = () => {
    let newIndex = playing - 1;
    if (newIndex < 0) {
      newIndex = songs.length - 1;
    }
    changePlaying(newIndex);
    setCurrentSong(songs[newIndex]);
    audioElem.current.currentTime = 0;
  };

  const skiptoNext = () => {
    if (songs.length == 0) {
      setisplaying(true);
      audioElem.current.currentTime = 0;
      return;
    }
    let newIndex = playing + 1;
    if (newIndex >= songs.length) {
      newIndex = 0;
    }
    changePlaying(newIndex);
    setCurrentSong(songs[newIndex]);
    setisplaying(true);
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
