// Dependencies
const express = require('express');


// Initialize the Express App
const app = express();


// Configure App Settings
require("dontenv").config();

const {PORT = 4000} = process.env;
// Mount Middleware

// Mount Routes
app.get("/", (req,res) => {
    res.send("Hello World");
});

// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`);
});