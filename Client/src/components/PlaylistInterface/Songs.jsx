import React from "react";

function Songs(props) {
  const data = props.song;
  const id = props.id;
  return (
    <tr className="song-main" >
      <a id={data._id} hidden>
        {data.song_url}
      </a>

      <td style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <a href="#" onClick={()=>props.runTheSong(data)}>
            {id}
        </a>

        <img className="songIMG" src={data.image_link} alt={data.song_name} />
      </td>
      <td>{data.song_name}</td>
      <td>{data.artist_name}</td>
      <td>{data.album_name}</td>
      <td>{data.release_date}</td>
      <td>{data.duration_m}</td>
    </tr>
  );
}

export default Songs;
