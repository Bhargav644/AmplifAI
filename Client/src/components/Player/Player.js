import { useRef, useState, useEffect, useContext } from "react";
import PlayerMain from "./PlayerMain";
import axios from "axios";
import { currSongContext } from "../../App";

const Player = (props) => {
  const [isplaying, setisplaying] = useState(true);

  const [playing, changePlaying] = useState(0);
  const { currSong, setCurrSong, currPlaylist, setCurrPlaylist } =
    useContext(currSongContext);

  // useEffect(() => {
  //   setisplaying(false);
  //   setisplaying(true);

  // }, [currSong,currPlaylist])

  const audioElem = useRef();

  useEffect(() => {
    if (audioElem.current) {
      if (isplaying) {
        audioElem.current.play();
      } else {
        audioElem.current.pause();
      }
    }
  }, [isplaying]);

  useEffect(() => {
    if (!currSong) {
      return;
    }

    const handleEnded = () => {
      if (currPlaylist.length > 0) {
        const index = currPlaylist.findIndex((x) => x.title === currSong.title);
        if (index === currPlaylist.length - 1) {
          setCurrSong(currPlaylist[0]);
          audioElem.current.currentTime = 0;
          setisplaying(false);
          setisplaying(true);
        } else {
          setCurrSong(currPlaylist[index + 1]);
          audioElem.current.currentTime = 0;
          setisplaying(false);
          setisplaying(true);
        }
      } else {
        setCurrSong(null);
      }
    };
    const playNextSong = () => {
      const index = currPlaylist.findIndex((x) => x.title === currSong.title);
      if (index === currPlaylist.length - 1) {
        setCurrSong(currPlaylist[0]);
      } else {
        setCurrSong(currPlaylist[index + 1]);
      }
      setisplaying(false);
    };

    const playPreviousSong = () => {
      const index = currPlaylist.findIndex((x) => x.title === currSong.title);
      if (index === 0) {
        setCurrSong(currPlaylist[currPlaylist.length - 1]);
      } else {
        setCurrSong(currPlaylist[index - 1]);
      }
      setisplaying(false);
    };

    const audioElement = audioElem.current;
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currSong, currPlaylist]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrSong({
      ...currSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <>
      <audio src={currSong.song_url} ref={audioElem} onTimeUpdate={onPlaying} />
      <PlayerMain
        songs={currPlaylist}
        playing={playing}
        changePlaying={changePlaying}
        setSongs={setCurrPlaylist}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currSong}
        setCurrentSong={setCurrSong}
      />
    </>
  );
};

export default Player;
