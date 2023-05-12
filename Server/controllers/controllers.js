const Songs = require("../models/songs")["model"];
const generatePlaylist = require("../helper/helper")["generatePlaylist"];

const homeController = (req, res) => {
  res.status(200).json({ message: "It's server" });
};

/** Finds the artist according to keyword */
const artistController = async (req, res) => {
  try {
    const artistKeyword = req.params.artist;
    const artist_songs = await Songs.find({
      artist_name: { $regex: artistKeyword, $options: "i" },
    });
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

    const songs = await Songs.find({
      song_name: { $regex: songKeyword, $options: "i" },
    });
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
      const songs = await Songs.find({
        album_name: { $regex: albumKeyword, $options: "i" },
      });
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

    const songs = await Songs.find({
      tag: { $regex: songKeyword, $options: "i" },
    });
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

module.exports = {
  homeController: homeController,
  songController: songController,
  artistController: artistController,
  albumController: albumController,
  tagController: tagController,
  allSongController: allSongController,
};
