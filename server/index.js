
//Create Express Server
const express = require("express");
//Instance of the Express Library
const app = express();
//Instance of the http library / http server
const http = require("http");
//Takes Class Server from the socket.io library
const { Server } = require("socket.io");
const cors = require("cors");

//Inport and use the cors library for the app
app.use(cors());

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
});

//server will listen on port 3001 (3001 is the port for the server)
server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});