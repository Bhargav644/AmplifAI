import React from "react";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";

function Search({ searchResults }) {
  return (
    <div className="search_results">
      <div
        className="mood_inner_search"
        style={{ backgroundColor: "rgb(192, 160, 168)" }}
      >
        {/*<div className="mood_inner"></div>
        <div className="mood_inner_info">
          <div className="mood_header"></div>
          <div className="mood_header">Sad Songs</div>
          <div>Song for broken Hearts</div>
  </div>*/}
      </div>
      <div className="">
        <table>
          <thead>
            <tr style={{ textAlign: "left" }}>
              <th>#</th>
              <th>Song Name</th>
              <th>Album Name</th>
              <th>
                <BiTime />
              </th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((song, i) => {
              let id = i + 1;
              return (
                <tr>
                  <td>{id}</td>
                  <td
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <img
                      src={song.image_link}
                      alt=""
                      style={{ height: "50px", borderRadius: "10px" }}
                    />
                    <div
                      className="song_title"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <p>{song.song_name}</p>
                      <p>{song.artist_name}</p>
                    </div>
                  </td>
                  <td className="song_album">{song.album_name}</td>
                  <td>{song.duration_m}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Search;
