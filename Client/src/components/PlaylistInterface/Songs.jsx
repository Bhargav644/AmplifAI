import React from 'react'

function Songs(props) {
  const data=props.song;
  const id=props.id;
  return (
    <div className='song-main' >

        <a id={data._id} hidden>{data.song_url}</a>

        <div className='song-sno'>
            {id}
        </div>

        <div className='song-img'>
            <img className='songIMG' src={data.image_link}  />
        </div>

        <div className='song-detail'>
            <p>{data.song_name}</p>
            <p>{data.artist_name}</p>
        </div>
        <div className='song-album'>
            {data.album_name}
        </div>
        <div className='song-release-date'>
            {data.release_date}
        </div>

        <div className='song-duration'>
            {data.duration_m}
        </div>

    </div>
  )
}

export default Songs;