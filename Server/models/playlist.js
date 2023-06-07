const mongoose=require("../config/db");
const songSchema=require("./songs")['schema'];

// const Schema=mongoose.Schema;

const playlistSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    playlist_name:String,
    playlist_songs:[songSchema]
    
},{ collection: 'Songs' });

const Playlists=new mongoose.model("playlists",playlistSchema)

module.exports = {
    "model":Playlists,
    "schema":playlistSchema,
}