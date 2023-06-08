const app=require("../config/init")
const controllers=require("../controllers/controllers");



const albumController = controllers['albumController'];
const getEmotionPlaylist = controllers['getEmotionPlaylist'];
const getOneTapCredentials=controllers['getOneTapCredentials']
const getPopUpCredentials=controllers['getPopUpCredentials'];
const addToLikedSongs=controllers['addToLikedSongs'];
const likedSongs=controllers['likedSongs'];
const findSongs=controllers['findSongs'];

function routes(){

    app.post("/album",albumController);
    app.post("/getEmotionPlaylist",getEmotionPlaylist);
    app.post("/api/google-onetap-login", getOneTapCredentials);
    app.post("/api/google-popup-login", getPopUpCredentials);   
    app.post("/addToLikedSongs", addToLikedSongs);   
    app.post("/likedSongs", likedSongs);   
    app.post("/findSongs", findSongs);   

}



module.exports=routes;


