const app=require("../config/init")
const controllers=require("../controllers/controllers");



const albumController = controllers['albumController'];

function routes(){

    app.post("/album",albumController);
}



module.exports=routes;


