// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const morgan = require("morgan");


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



// Set up our model
const peopleSchema = new mongoose.Schema({
    name: String,
    imgage: String,
    title: String
}, {timestamps: true});

const People = mongoose.model("People", peopleSchema)


// Mount Middleware
    /*  app.use(express.urlencoded({extended: false}))
        only when express is serving HTML   */

app.use(cors());// Access-Control-Allow
app.use(morgan("dev"));
app.use(express.json()); // Creates req.body from incomoing JSON request bodies


// Mount Routes
app.get("/", (req,res) => {
    res.send("Hello World");
});

// Index
app.get("/people", async (req,res) => {

    try {
        const people = await People.find({});
        res.send(people);
    } catch (error) {
        console.log("error:", error);
        res.send({error: "Something Went Wrong - Check Console"});
    }
});

// Non async await version
// app.get("/people", (req,res) => {
//     People.find({}, (err, people) => {
//         res.send(people);
//     });
// });



// Create
app.post("/people", async (req,res) => {
    try {
        const person = await People.create(req.body);
        res.send(person);
    } catch (error) {
        console.log('error: ', error);
        res.send({error: "Something Went Wrong - Check Console"});
    }
})
// Update
// Delete


// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`);
});