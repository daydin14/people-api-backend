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
    res.send("Hello and Welcome to the People App");
});

// Non async await version
// app.get("/people", (req,res) => {
//     People.find({}, (err, people) => {
//         res.send(people);
//     });
// });      // This Code Block is also an Index Route

// Index
app.get("/people", async (req,res) => {

    try {
        const people = await People.find({});
        res.json(people);
    } catch (error) {
        console.log("error:", error);
        res.json({error: "Something Went Wrong - Check Console"});
    }
});

// Create
app.post("/people", async (req,res) => {
    try {
        const person = await People.create(req.body);
        res.json(person);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: "Something Went Wrong - Check Console"});
    }
});

// Update
app.put("/people/:id", async (req, res) => {
    try {
        
        const updatedPerson = await People.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            {new: true}
        );
        res.json(updatedPerson);
        
        // res.json(await People.findByIdAndUpdate(req.params.id, req.body, {new: true}));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: "Something Went Wrong - Check Console"});
    }
});

// Delete
app.delete("/people/:id", async (req,res) => {
    try {
        res.json(await People.findByIdAndDelete(req.params.id));
    } catch (error) {
        console.log('error: ', error);
        res.json({error: "Something Went Wrong - Check Console"});
    }
});

// Tell Express to Listen
app.listen(PORT, () => {
    console.log(`Express is listening on PORT: ${PORT}`);
});