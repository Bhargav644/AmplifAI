const app=require("../config/init")
const controllers=require("../controllers/controllers");



const albumController = controllers['albumController'];
const getEmotionPlaylist = controllers['getEmotionPlaylist'];
const getOneTapCredentials=controllers['getOneTapCredentials']
const getPopUpCredentials=controllers['getPopUpCredentials']

function routes(){

    app.post("/album",albumController);
    app.post("/getEmotionPlaylist",getEmotionPlaylist);
    // app.post("/api/google-onetap-login", getOneTapCredentials);
    // app.post("/api/google-popup-login", getPopUpCredentials);   
}



module.exports=routes;


