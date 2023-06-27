// import "./App.css";
import "./styles/tailwind.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";
// import SignUpForm from "./Components/SignUpForm";
// import LoginForm from "./Components/LoginForm";
import Container from "./Components/container/Container";
import SignUpLoginPopup from "./Components/signUpLoginPopup/SignUpLoginPopup";
import Header from "./Components/header/Header";
import Chat from "./Components/Chat";
import AboutUS from "./Components/aboutUs/AboutUsPage";
import RegisterPage from "./Components/register/RegisterPage";
import AboutUsPage from "./Components/aboutUs/AboutUsPage";
import MySchedulePage from "./Components/mySchedule/MySchedulePage";
import MyImagesPage from "./Components/myImages/MyImagesPage";
import Home from "./Components/home/Home";

//Establishes a connection to the Socket.IO server running on localhost:3001.
// const socket = io.connect("http://localhost:3001");

// socket.on("connect", () => {
//   console.log("Socket connection successful in app");
// });

// socket.on("connect_error", (error) => {
//   console.log("Socket connection failed:", error);
// });

function App() {
  // //Room State
  // //roomNum
  // const [room, setRoom] = useState("");

  // // Messages States
  // //message from input box
  // const [message, setMessage] = useState("");
  // //most recent message that was received
  // const [messageReceived, setMessageReceived] = useState("");

  // socket.on("disconnect", () => {
  //   console.log("Socket disconnected");
  // });

  // const joinRoom = () => {
  //   //if room is new
  //   if (room !== "") {
  //     //use the "join_room" event to join the room with room num
  //     socket.emit("join_room", room);
  //   }
  // };
  // //sendMessage function
  // const sendMessage = () => {
  //   //use the send_message event to send a message to a specific room
  //   socket.emit("send_message", { message, room });
  // };

  // //waits for the receive_message event
  // useEffect(() => {
  //   //listens for the data variable and stores the data.message in the messsageRecieved Variable
  //   socket.on("receive_message", (data) => {
  //     setMessageReceived(data.message);
  //   });
  //   //}, [socket]);
  // }, []);

  const [currentPage, setCurrentPage] = useState("HomePage");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <Header isUserLoginedIn={true} username={"ishanphadte776"} handleNavigation={handleNavigation}>
        
      </Header>

      {/* <input
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>

      <h1 className="text-3xl font-bold mt-4">Message:</h1>

      {messageReceived} */}

      {/* <Container> </Container> */}

      {currentPage === "HomePage" && <Home/>}
      {currentPage === "AboutUsPage" && <AboutUsPage />}
      {currentPage === "RegisterPage" && <RegisterPage />}
      {currentPage === "MySchedulePage" && <MySchedulePage />}
      {currentPage === "MyImagesPage" && <MyImagesPage />}

      <Chat> </Chat>
    </div>
  );
}

export default App;
