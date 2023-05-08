import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

//Establishes a connection to the Socket.IO server running on localhost:3001.
const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  //roomNum
  const [room, setRoom] = useState("");

  // Messages States
  //message from input box
  const [message, setMessage] = useState("");
  //most recent message that was received
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    //if room is new
    if (room !== "") {
      //use the "join_room" event to join the room with room num
      socket.emit("join_room", room);
    }
  };
  //sendMessage function
  const sendMessage = () => {
    //use the send_message event to send a message to a specific room
    socket.emit("send_message", { message, room });
  };

  //waits for the receive_message event
  useEffect(() => {
    //listens for the data variable and stores the data.message in the messsageRecieved Variable
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
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
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;