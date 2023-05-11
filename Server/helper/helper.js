const extractMovie=(name)=>{
    if(name && name.includes('(') && name.includes(')')){
        let start=name.indexOf('(')+1;
        let end=name.indexOf(')');
        return name.substring(start,end);
    }
    else{
        return name;
    }
}


const generatePlaylist=(playlistName,songs)=>{

    const minLength=songs.length%15;
    const to_include=songs.slice(0,minLength);

    console.log(playlistName)
    const playlist={
        "playlistName":extractMovie(playlistName),
        "songs":[...to_include],
    }
    return playlist;
}

module.exports={
    generatePlaylist,
}