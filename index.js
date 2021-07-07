require("dotenv").config();

// framework 
const express = require("express");
const mongoose = require("mongoose");

// Initializing Microservices Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const publications = require("./API/Publication");

// Initializing express
const shapeAI = express();

// Configuration
shapeAI.use(express.json());

// Establish database connection
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(() => console.log("connection established!!!!!!!"));


// Initializing Microservices
shapeAI.use("/book", Books);
shapeAI.use("/author", Authors);
shapeAI.use("/publication", publications);

shapeAI.listen(3000, () => console.log("Hey server is running 😎"));

// we need library talk to mongodb in which mongodb understands =>
//talk to us in the way we understand => javascript

//mongoose

// why schema?
// mongodb is schemaless
// mongoose helps you with validation, relationship with other data contain building data

// model -> docc model of mongoDB
// conver scheema with model and use them