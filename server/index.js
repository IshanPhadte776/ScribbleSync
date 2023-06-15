
//Create Express Server
const express = require("express");

const app = express();
//Instance of the http library / http server
const http = require("http");
//Takes Class Server from the socket.io library
const { Server } = require("socket.io");
const cors = require("cors");

const router = express.Router();

const bodyParser = require('body-parser');





//Import Mongoose
const mongoose = require("mongoose");

const uri = "mongodb+srv://Ishanphadte:IshWinner5678@whiteboardcluster.b3y1lmg.mongodb.net/?retryWrites=true&w=majority"


//Inport and use the cors library for the app
app.use(cors());

// Parse incoming request bodies
app.use(express.json());

//Full create the http server
const server = http.createServer(app);

//Create the Server
const io = new Server(server, {
  cors: {
    //Origin of the front-end 
    //allows the following urls to be used
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST"],
  },
});


//sets up an event listener for when a new user is connected
//socket represents the new user
io.on("connection", (socket) => {
  //console.log statement
  console.log(`User Connected: ${socket.id}`);

  //This sets up an event listener for when the client emits a join_room event. 
  //The join_room event is a custom event that can be emitted by the client to indicate that it wants to join a specific chat room. 
  //When this event is received, the server joins the socket to the specified room using the socket.join() method.
  socket.on("join_room", (data) => {
    //data is the num of the chat room
    socket.join(data);

  });

  //This sets up an event listener for when the client emits a send_message event. 
  //his sets up an event listener for when the client emits a send_message event. This event is emitted by the client to send a message to other users in a specific chat room. 
  //data variable is the message itself
  socket.on("send_message", (data) => {
    //When this event is received, the server emits a receive_message event to all other sockets in the same room using the socket.to() method. 
    //data =  { message: 'hello', room: '25' }
    socket.to(data.room).emit("receive_message", data);

  });

  socket.on('canvas-data', (data)=> {
    socket.broadcast.emit('canvas-data', data);
    
  })


  socket.on('erase-board', ()=> {
    socket.broadcast.emit('erase-board');
    
  })

});

async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

// Define the schema for your user data
const userSchema = new mongoose.Schema(
  {
  username: String,
  email: String,
  password: String
  },

);

// Create a model for your user data based on the schema
const User = mongoose.model('users', userSchema);

// get all users from MongoDB
app.get('/getUsers', async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ users: allUser});
  } catch (error) {
    console.error(error);
  }
});

// Set up the POST route to create a new user
//This url has to be /name and no localhost nonsense
app.post('/addUsers', async (req, res) => {
  try {
    // Create a new User object with data from the request body
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Save the new user to the database
    await user.save();

    // Send a response indicating the new user was created successfully
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    // If an error occurs, send a response with the error message
    res.status(400).json({ message: err.message });
  }
});

//server will listen on port 3001 (3001 is the port for the server)
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});