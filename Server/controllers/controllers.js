const Songs = require("../models/songs")["model"];
const generatePlaylist = require("../api/helper")["generatePlaylist"];
const SongsAPI=require("../api/songs");
const Playlist = require("../models/playlist")['model'];

const homeController = (req, res) => {
  res.status(200).json({ message: "It's server" });
};

/** Finds the artist according to keyword */
const artistController = async (req, res) => {
  try {
    const artistKeyword = req.params.artist;
    const artist_songs = await SongsAPI.getSongsByArtist(artistKeyword);
    if (artist_songs.length == 0) {
      res.status(404).json({ message: "Artist not found." });
    } else {
      res.status(200).json(artist_songs);
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving songs." });
  }
};

/** Finds the requested song */
const songController = async (req, res) => {
  try {
    const songKeyword = req.params.song;
    const songs = await SongsAPI.getSongsByName(songKeyword);
    if (songs.length == 0) {
      res.status(404).json({ message: "Song not found." });
    } else {
      res.status(200).json(songs);
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving songs." });
  }
};

/** Finds the requested album */
const albumController = async (req, res) => {
  try {
    const albumKeyword = req.body.album;

    if (albumKeyword != undefined) {
      const songs = await SongsAPI.getSongsByAlbum(albumKeyword);
      const albumName = songs[0].album_name;
      console.log(albumName);
      if (songs.length == 0) {
        res.status(404).json({ message: "Album not found." });
      } else {
        res.status(200).json(await generatePlaylist(albumName, songs));
      }
    } else {
      res.status(404).json({ message: "Keyword Required" });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving songs." });
  }
};
/** Finds the requested tag */
const tagController = async (req, res) => {
  try {
    const songKeyword = req.params.tag;

    const songs = await SongsAPI.getSongsByTag(songKeyword);
    if (songs.length == 0) {
      res.status(404).json({ message: "Tag not found." });
    } else {
      res.status(200).json(songs);
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving songs." });
  }
};

/** Finds the requested tag */
const allSongController = async (req, res) => {
  try {
    const songs = await Songs.find();

    res.status(200).json(songs);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving songs." });
  }
};

const allPlaylistController=async(req,res)=>{
  try{
    const playlists=await Playlist.find();
    res.status(200).json(playlists);
  }
  catch(error){
    res
      .status(500)
      .json({ error: "An error occurred while retrieving playlists." });
  }
}


const getPlaylistById=async(req,res)=>{
  const id=req.params.id;
  try{
    const playlist=await Playlist.find({'_id':id});
    res.status(200).json(playlist);
  }
  catch(error){
    res
      .status(500)
      .json({ error: "An error occurred while retrieving playlists." });
  }
}
const getEmotionPlaylist=async(req,res)=>{
  const emotion=req.body.emotion;

  try{
    const all_songs=await SongsAPI.getSongsByTag(emotion.toLowerCase());
    const playlists=generatePlaylist(emotion.toUpperCase(),all_songs);
    res.status(200).json(playlists);
  }
  catch(error){
    res
      .status(500)
      .json({ error: "An error occurred while retrieving playlists." });
  }

}

module.exports = {
  homeController: homeController,
  songController: songController,
  artistController: artistController,
  albumController: albumController,
  tagController: tagController,
  allSongController: allSongController,
  allPlaylistController:allPlaylistController,
  getPlaylistById:getPlaylistById,
  getEmotionPlaylist:getEmotionPlaylist,
};
