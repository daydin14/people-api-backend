// Dependencies
const express = require('express');
const mongoose = require('mongoose');


// Initialize the Express App
const app = express();


// Configure App Settings
require("dotenv").config();
const {PORT = 4000, MONGODB_URL} = process.env;


// Connect to mongoDB
mongoose.connect(MONGODB_URL);

// Monogo Status Listeners
mongoose.connection
    .on("connected", () => console.log("Connected to MongoDB"))
    .on("close", () => console.log("You are disconnected from MongoDB"))
    .on("error", (error) => console.log("Error with MongoDB: " + error));
// Mount Middleware

// Mount Routes
app.get("/", (req,res) => {
    res.send("Hello World");
});

// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`);
});