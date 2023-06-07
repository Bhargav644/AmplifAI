const app = require("../config/init");
const controllers = require("../controllers/controllers");

const homeController = controllers["homeController"];
const songController = controllers["songController"];
const artistController = controllers["artistController"];
const tagController = controllers["tagController"];
const getSongController = controllers["allSongController"];
const getPlaylistController = controllers["allPlaylistController"];

function routes() {
  app.get("/", homeController);
  app.get("/artist/:artist", artistController);
  app.get("/song/:song", songController);
  app.get("/tags/:tag", tagController);
  app.get("/getAllSongs", getSongController);
  app.get("/getPlaylist", getPlaylistController);
}

module.exports = routes;
