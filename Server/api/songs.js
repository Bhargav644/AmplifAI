const Songs = require("../models/songs")["model"];
class SongsAPI {
  async getSongsByArtist(keyword) {
    try {
      const artist_songs = await Songs.find({
        artist_name: { $regex: keyword, $options: "i" },
      });
      return artist_songs;
    } catch (err) {
      throw new Error(err.message);
    }
  }
  async getSongsByAlbum(keyword) {
    try {
      const album_songs = await Songs.find({
        album_name: { $regex: keyword, $options: "i" },
      });
      return album_songs;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getSongsByTag(keyword) {
    try {
      const tag_songs = await Songs.find({
        tag: { $regex: keyword, $options: "i" },
      });
      return tag_songs;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async getSongsByAdditonalTag(keyword) {
    try {
      const tag_songs = await Songs.find({
        additional_tags: {
          $elemMatch: { $regex: keyword, $options: 'i' }
        }
      });
      return tag_songs;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = new SongsAPI();
