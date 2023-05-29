const express = require('express');
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require('cookie-parser');


// express app initialization
const app = express();
dotenv.config();


// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// set static folder
app.use(express.static(path.join(__dirname, "public")));


// set view engine
app.set("view engine", "ejs");


// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));


// routing setup



// Database connection with mongoose
async function chatApp() {
    try {
        await mongoose.connect(process.env.DB_CONNECTION_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("Database connected successfully!!");

    } catch (error) {
        console.log(error)
    }
};



// App Listen
app.listen(process.env.PORT || 3000, () => {
    chatApp();
    console.log(`app listening at port ${process.env.PORT}!!`);
});