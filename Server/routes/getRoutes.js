const app=require("../config/init")
const controllers=require("../controllers/controllers");


const homeController = controllers['homeController'];
const songController = controllers['songController'];
const artistController = controllers['artistController'];

function routes(){

    app.get("/",homeController);
    app.get("/artist/:artist",artistController);
    app.get("/song/:song",songController);
}



module.exports=routes;
