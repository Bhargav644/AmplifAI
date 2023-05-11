const path=require("node:path");
const mongoose = require("mongoose");

require("dotenv").config({
    path:path.resolve("config/.env")
})

const getRoutes=require("./routes/getRoutes");
const postRoutes=require("./routes/postRoutes");
const app=require("./config/init");

getRoutes();
postRoutes();


app.listen(process.env.PORT);