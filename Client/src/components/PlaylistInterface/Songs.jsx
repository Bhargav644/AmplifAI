import React, { useState } from "react";
import { BiHeart, BiPlay } from "react-icons/bi";

function Songs(props) {
  const [isHovered, setIsHovered] = useState(false);
  const data = props.song;
  const id = props.id;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  return (
    <tr
      className="song-main"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a id={data._id} hidden>
        {data.song_url}
      </a>

      <td style={{ textAlign: "center", boxSizing: "border-box" }}>
        <a href="#" onClick={() => props.runTheSong(data)}>
          {isHovered ? (
            <BiPlay
              style={{
                fontSize: "35px",
                position: "absolute",
                transform: "translate(-15px,-15px)",
              }}
            />
          ) : (
            id
          )}
        </a>
      </td>
      <td
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "25px",
        }}
      >
        <img className="songIMG" src={data.image_link} alt={data.song_name} />

        <div
          className="song_title"
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <p>{data.song_name}</p>
          <p>{data.artist_name}</p>
        </div>
      </td>
      <td className="album_name">{data.album_name}</td>
      <td className="release_date">{data.release_date}</td>
      <td
        className="duration"
        style={{ textAlign: "left", boxSizing: "border-box" }}
      >
        {isHovered ? (
          <>
            <BiHeart
              style={{
                fontSize: "20px",
                position: "absolute",
                transform: "translate(-25px,-1px)",
              }}
              onClick={() => {
                console.log("Clicked on Heart");
              }}
            />
            {data.duration_m}
          </>
        ) : (
          data.duration_m
        )}
      </td>
    </tr>
  );
}

export default Songs;
