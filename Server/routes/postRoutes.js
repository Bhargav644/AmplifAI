const app=require("../config/init")
const controllers=require("../controllers/controllers");



const albumController = controllers['albumController'];
const getEmotionPlaylist = controllers['getEmotionPlaylist'];

function routes(){

    app.post("/album",albumController);
    app.post("/getEmotionPlaylist",getEmotionPlaylist)
}



module.exports=routes;


