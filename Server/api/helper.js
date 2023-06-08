const extractMovie = (name) => {
  if (name && name.includes("(") && name.includes(")")) {
    let start = name.indexOf("(") + 1;
    let end = name.indexOf(")");
    return name.substring(start, end);
  } else {
    return name;
  }
};

function generateRandomId() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 8;
  let randomId = '';

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
}

const generatePlaylist = (playlistName, songs) => {
  const playlists=[]
  const numSets=Math.ceil(songs.length/10);

  for(let i=0;i<numSets;i++) {
    const startIdx=i*10;
    const endIdx=startIdx+10;
    const playlist_name=`${playlistName} ${i+1}`

    const playlist_songs=songs.slice(startIdx, endIdx);
    const _id = generateRandomId();
    const currPlaylist={
        _id: _id,
        playlist_name: playlist_name,
        playlist_songs:playlist_songs
    }
    playlists.push(currPlaylist);
  }

  return playlists;
};




module.exports = {
  generatePlaylist,
};
