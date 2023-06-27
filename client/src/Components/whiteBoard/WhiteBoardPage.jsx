import { useEffect, useState } from 'react'
import React from 'react'
import Board from '../board/Board'
import Container from '../container/Container'
import io from "socket.io-client";


const socket = io.connect("http://localhost:3001");

socket.on("connect", () => {
  console.log("Socket connection successful in app");
});

socket.on("connect_error", (error) => {
  console.log("Socket connection failed:", error);
});

function WhiteBoardPage() {

    //Room State
  //roomNum
  const [room, setRoom] = useState("");

  // Messages States
  //message from input box
  const [message, setMessage] = useState("");
  //most recent message that was received
  const [messageReceived, setMessageReceived] = useState("");

  socket.on("disconnect", () => {
    console.log("Socket disconnected");
  });

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
    //}, [socket]);
  }, []);

  const handleNavigation = (page) => {
    //setCurrentPage(page);
  };

  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("5");

  const changeColor = (e) => {
    setColor(e.target.value);
  };

  const changeSize = (e) => {
    setSize(e.target.value);
  };


  return (
    <div>
    <div>
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
      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Message
      </button>

      <h1 className="text-3xl font-bold mt-4">Message:</h1>

      {messageReceived}
    </div>
     <div className="container">
       <div className="tools-section">
         <div className="color-picker-container">
           Select Brush Color : &nbsp;
           <input type="color" value={color} onChange={changeColor} />
         </div>

         <div className="brushsize-container">
           Select Brush Size : &nbsp;
           <select value={size} onChange={changeSize}>
             <option> 5 </option>
             <option> 10 </option>
             <option> 15 </option>
             <option> 20 </option>
             <option> 25 </option>
             <option> 30 </option>
           </select>
         </div>

         <div>

         </div>
       </div>

       <div className="board-container">
         <Board color={color} size={size}></Board>
       </div>
     </div>
    </div>
  )
}

export default WhiteBoardPage