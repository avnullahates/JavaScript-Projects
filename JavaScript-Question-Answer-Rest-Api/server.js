const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler = require("./middlewares/error/customErrorHandler")
const routers = require("./routers");
const path = require("path");


//Enviroment Variable
dotenv.config({
    path: "./config/env/config.env"
});
//MongoDb Connetction


connectDatabase();

const app = express();

//Express -Body Middleware
app.use(express.json());

const PORT = process.env.PORT;

//Routers Middleware
app.use("/api",routers)

//ErrorHandling
app.use(customErrorHandler);


//Static files
app.use(express.static(path.join(__dirname,"public")));



app.listen(PORT, () => {
    console.log(`App started on ${PORT} :  ${process.env.NODE_ENV}`);
});

