// Import required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

// Create Express app
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3002"],
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const uri = "mongodb+srv://<username>:<password>@<cluster-url>/database-name";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Define the schema for your user data
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Create a model for your user data based on the schema
const User = mongoose.model("User", userSchema);

// Route to get all users from MongoDB
app.get("/users", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.send({ users: allUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
});

// Route to create a new user
app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }
});

// Route to handle saving the canvas image
app.post("/saveImage", (req, res) => {
  console.log("Received request to save image");

  const base64Data = req.body.imageData;
  console.log("Base64 image data:", base64Data);

  const fileName = `canvas_${Date.now()}.png`;
  console.log("Generated file name:", fileName);

  const clientFolderPath = path.join(__dirname, "client", "public");
  const filePath = path.join(clientFolderPath, fileName);
  console.log("File path:", filePath);

  const data = base64Data.replace(/^data:image\/\w+;base64,/, "");
  console.log("Trimmed image data:", data);

  // Check if the directory exists, and create it if necessary
  if (!fs.existsSync(clientFolderPath)) {
    fs.mkdirSync(clientFolderPath, { recursive: true });
  }

  fs.writeFile(filePath, data, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to save image" });
    } else {
      console.log("Image saved successfully");
      res.status(200).json({ success: true, message: "Image saved successfully" });
    }
  });
});

// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);
  
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomCode).emit("receive_message", data);
  });

  socket.on("canvas-data", (data) => {
    socket.broadcast.emit("canvas-data", data);
  });

  socket.on("erase-board", () => {
    socket.broadcast.emit("erase-board");
  });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
