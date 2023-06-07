const Songs = require("../models/songs")["model"];
<<<<<<< HEAD
class SongsAPI{
    async getSongsByArtist(keyword){
        try{
            const artist_songs = await Songs.find({
                artist_name: { $regex: keyword, $options: "i" },
            });
            return artist_songs;
        }
        catch(err){
            throw new Error(err.message);
        }
=======
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

  async getSongsByName(keyword) {
    try {
      const songs = await Songs.find({
        song_name: { $regex: keyword, $options: "i" },
      });
      return songs;
    } catch (err) {
      throw new Error(err.message);
>>>>>>> 2eba741c11143f4dd5041979dd562a7b870831de
    }
  }
  async getSongsByAlbum(keyword) {
    try {
      const album_songs = await Songs.find({
        album_name: { $regex: albumKeyword, $options: "i" },
      });
      return album_songs;
    } catch (err) {
      throw new Error(err.message);
    }
<<<<<<< HEAD

    async getSongsByTag(keyword){
        try{
            const tag_songs= await Songs.find({
                tag: { $regex: songKeyword, $options: "i" },
              });
            return tag_songs;
        }
        catch(err){
            throw new Error(err.message);
        }
    }
=======
  }
>>>>>>> 2eba741c11143f4dd5041979dd562a7b870831de
}

module.exports = new SongsAPI();
