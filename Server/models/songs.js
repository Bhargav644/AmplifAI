const mongoose=require("../config/db");

// const Schema=mongoose.Schema;

const songSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    song_name:String,
    artist_name:String,
    release_date:String,
    duration_ms:Number,
    image_link:String,
    duration_m:Number,
    filename:String,
    song_url:String,
    tag:String,
},{ collection: 'Songs' });

const Songs=new mongoose.model("Songs",songSchema)

module.exports = {
    "model":Songs,
    "schema":songSchema,
}