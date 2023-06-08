import React,{useEffect} from "react";
import { BiTime } from "react-icons/bi";
import { Link } from "react-router-dom";
import Songs from "./components/PlaylistInterface/Songs";

function Search({ user,currSong,setCurrSong,searchResults ,setSearchResults}) {

  const runTheSong = (data) => {
    setCurrSong(data);
  };
  useEffect(() => {
    document.getElementById("mood_inner_search").addEventListener("mouseleave",()=>{
      setSearchResults([])
    })
  },[])
  return (
    <div className="search_results">
      <div id="mood_inner_search" className="mood_inner_search">
        
      
              <table>
                <thead>
                  <tr style={{ textAlign: "left" }}>
                    <th>#</th>
                    <th>Song Name</th>
                    {/*<th>Artist Name</th>*/}
                    <th>Album Name</th>
                    <th>Release Date</th>
                    <th>
                      <BiTime />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(searchResults).map((key, index) => (
                    <Songs
                    user={user}
                      runTheSong={runTheSong}
                      song={searchResults[key]}
                      id={index + 1}
                      key={index}
                      />
                      ))}
                </tbody>
              </table>
            </div>
            </div>
    
  );
}

export default Search;
