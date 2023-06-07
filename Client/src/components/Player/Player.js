import { useRef, useState, useEffect } from "react";
import PlayerMain from "./PlayerMain";
import axios from "axios";

const Player = (props) => {
  const [songs, setSongs] = useState([]);
  const [isplaying, setisplaying] = useState(false);
  const [currentSong, setCurrentSong] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/getAllSongs`);
        setSongs(response.data);
        setCurrentSong(response.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
    if (!currentSong) {
      return;
    }

    const handleEnded = () => {
      const index = songs.findIndex((x) => x.title === currentSong.title);
      if (index === songs.length - 1) {
        setCurrentSong(songs[0]);
      } else {
        setCurrentSong(songs[index + 1]);
      }
    };
    const playNextSong = () => {
      const index = songs.findIndex((x) => x.title === currentSong.title);
      if (index === songs.length - 1) {
        setCurrentSong(songs[0]);
      } else {
        setCurrentSong(songs[index + 1]);
      }
      setisplaying(false);
    };

    const playPreviousSong = () => {
      const index = songs.findIndex((x) => x.title === currentSong.title);
      if (index === 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else {
        setCurrentSong(songs[index - 1]);
      }
      setisplaying(false);
    };

    const audioElement = audioElem.current;
    audioElement.addEventListener("ended", handleEnded);

    return () => {
      audioElement.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, songs]);

  const onPlaying = () => {
    const duration = audioElem.current.duration;
    const ct = audioElem.current.currentTime;

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    });
  };

  return (
    <>
      {currentSong && (
        <audio
          src={currentSong.song_url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
        />
      )}
      <PlayerMain
        songs={songs}
        setSongs={setSongs}
        isplaying={isplaying}
        setisplaying={setisplaying}
        audioElem={audioElem}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
      />
    </>
  );
};

export default Player;
