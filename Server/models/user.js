const mongoose=require("../config/db");
const songsSchema=require("./songs")[schema]


const userSchema=new mongoose.Schema({
    // _id:mongoose.Schema.Types.ObjectId,
    name:String,
    email:String,
    photoURL:String,
    likedSongs:[songsSchema]
},{ collection: 'Users' });

const Users=new mongoose.model("Users",userSchema)

module.exports = {
    "model":Users,
    "schema":userSchema,
}