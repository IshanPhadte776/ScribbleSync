// Import required modules
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
require('dotenv').config();

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
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error(error));

// Define the schema for your user data
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

// Define the schema for your user data
const teacherSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String,
  Pronouns: String,
  NumOfStudents: String,
  ClassName: String,
});

const studentSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Password: String,
  ClassName: String,
});

// Define a schema for the image collection
const imageSchema = new mongoose.Schema({
  imageData: {
    type: String,
    required: true,
  },
  imageName: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  
});







// Create a model for your user data based on the schema
const User = mongoose.model("User", userSchema);

// Create a model for your user data based on the schema
const Teacher = mongoose.model("Teacher", teacherSchema);

// Create a model for your user data based on the schema
const Student = mongoose.model("Student", studentSchema);


// Create a model based on the schema
const Image = mongoose.model("Image", imageSchema);

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

// Route to get all teachers from MongoDB
app.get("/teachers", async (req, res) => {
  try {
    const allTeachers = await Teacher.find({});
    res.send({ Teachers: allTeachers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch teachers" });
  }
});

app.get("/students", async (req, res) => {
  try {
    const allStudents = await Student.find({});
    res.send({ Students: allStudents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch students" });
  }
});

// Route to create a new teacher
app.post("/teachers", async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password,Pronouns,NumOfStudents,ClassName } = req.body;
    const newTeacher = new Teacher({ FirstName, LastName, Email, Password, Pronouns, NumOfStudents, ClassName });
    await newTeacher.save();
    res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to create user" });
  }

});


// Define the API endpoint for saving an image
app.post("/saveImage2", async (req, res) => {
  const { imageData, imageName, subject, type } = req.body;

  try {
    // Create a new image document
    const image = new Image({
      imageData, imageName, subject, type
    });

    // Save the image in MongoDB
    const savedImage = await image.save();

    console.log("Image saved successfully:", savedImage);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Failed to save image:", error);
    return res.status(500).json({ success: false });
  }
});


// Route to handle saving the canvas image
app.post("/saveImage", (req, res) => {

  const base64Data = req.body.imageData;

  const fileName = `canvas_${Date.now()}.png`;

  const clientPublicFolderPath = path.join(__dirname, "../client/src/SavedImages");
  const filePath = path.join(clientPublicFolderPath, fileName);

  const data = base64Data.replace(/^data:image\/\w+;base64,/, "");

  // Check if the directory exists, and create it if necessary
  if (!fs.existsSync(clientPublicFolderPath)) {
    fs.mkdirSync(clientPublicFolderPath, { recursive: true });
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

// Route to get all images from MongoDB
app.get("/images", async (req, res) => {
  try {
    const allImages = await Image.find({});
    res.send({ images: allImages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch images" });
  }
});


// Socket.io connection handling
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  let isEditingAllowed = true; // Variable to track editing permission

  
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("leave_room", (roomCode) => {
    socket.leave(roomCode);
    console.log(`Socket ${socket.id} left room ${roomCode}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.roomCode).emit("receive_message", data);
  });

  socket.on("canvas-data", (data) => {
    if (isEditingAllowed) {
      socket.broadcast.emit("canvas-data", data);
    }
  });

  socket.on("erase-board", () => {
    socket.broadcast.emit("erase-board");
  });

  // socket.on("enableEditing", () => {
  //   isEditingAllowed = true;

  //   socket.broadcast.emit("editingAllowed");
  //   // io.to(socket.id).emit("editing_allowed"); // Send "editing_allowed" event only to the current socket
  //   // socket.broadcast.emit("update_editing_permission", { allowed: true }); // Broadcast the updated editing permission to other users
  // });

  // socket.on("disableEditing", () => {
  //   isEditingAllowed = false;

  //   socket.broadcast.emit("editingDisallowed");

  // });

  socket.on("disconnect", () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});

// Start the server
const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
